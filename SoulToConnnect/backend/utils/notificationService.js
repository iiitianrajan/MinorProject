// services/notificationService.js
/**
 * Notification Service — Twilio SMS & WhatsApp
 *
 * To activate real sending:
 *   1. npm install twilio
 *   2. Set env vars:
 *        TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *        TWILIO_AUTH_TOKEN=your_auth_token
 *        TWILIO_FROM_NUMBER=+1XXXXXXXXXX          (for SMS)
 *        TWILIO_WHATSAPP_FROM=whatsapp:+14155238886 (Twilio sandbox)
 *
 * Without the env vars the service logs to console (mock mode).
 */

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  });
};

const buildMessage = ({ name, pujaName, date, startTime, bookingId }) =>
  `🙏 Namaste ${name}!\n\nYour booking is CONFIRMED.\n\n` +
  `🪔 Ritual: ${pujaName}\n` +
  `📅 Date: ${formatDate(date)}\n` +
  `⏰ Time: ${startTime}\n` +
  `🆔 Booking ID: ${bookingId}\n\n` +
  `Thank you for choosing our sacred services. May the divine blessings be with you.`;

/* ─────────────────────────────────────
   Internal Twilio helper
───────────────────────────────────── */
const getTwilioClient = () => {
  const sid   = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;

  if (!sid || !token) return null;

  // Lazy-require so the app doesn't crash if twilio is not installed
  try {
    // eslint-disable-next-line global-require
    const twilio = require('twilio');
    return twilio(sid, token);
  } catch {
    console.warn('⚠️  twilio package not installed — run: npm install twilio');
    return null;
  }
};

/* ─────────────────────────────────────
   sendSMS
───────────────────────────────────── */
const sendSMS = async ({ phone, message }) => {
  const client = getTwilioClient();
  const from   = process.env.TWILIO_FROM_NUMBER;

  if (!client || !from) {
    console.log(`[SMS MOCK] → ${phone}\n${message}`);
    return { mock: true };
  }

  const result = await client.messages.create({
    body: message,
    from,
    to:   phone.startsWith('+') ? phone : `+91${phone}`, // default to India
  });

  console.log(`✅ SMS sent — SID: ${result.sid}`);
  return result;
};

/* ─────────────────────────────────────
   sendWhatsApp
───────────────────────────────────── */
const sendWhatsApp = async ({ phone, message }) => {
  const client = getTwilioClient();
  const from   = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';

  const to = `whatsapp:${phone.startsWith('+') ? phone : `+91${phone}`}`;

  if (!client) {
    console.log(`[WHATSAPP MOCK] → ${to}\n${message}`);
    return { mock: true };
  }

  const result = await client.messages.create({ body: message, from, to });
  console.log(`✅ WhatsApp sent — SID: ${result.sid}`);
  return result;
};

/* ─────────────────────────────────────
   sendBookingNotification  ← main export
   Tries WhatsApp first, falls back to SMS
───────────────────────────────────── */
const sendBookingNotification = async (payload) => {
  const message = buildMessage(payload);
  const { phone } = payload;

  try {
    // Primary: WhatsApp
    await sendWhatsApp({ phone, message });
  } catch (whatsappErr) {
    console.warn('WhatsApp failed, falling back to SMS:', whatsappErr.message);
    try {
      await sendSMS({ phone, message });
    } catch (smsErr) {
      console.error('SMS also failed:', smsErr.message);
    }
  }
};

module.exports = {
  sendBookingNotification,
  sendSMS,
  sendWhatsApp,
};