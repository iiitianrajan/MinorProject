import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';

const WebRTCContext = createContext();

export const useWebRTC = () => useContext(WebRTCContext);

export const WebRTCProvider = ({ children }) => {
  const { socket } = useSocket();
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    if (!socket) return;
    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, [socket]);

  // Request media permissions
  const requestMedia = async (video = true, audio = true) => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({ video, audio });
      setStream(currentStream);
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }
    } catch (err) {
      console.error('Failed to get local stream', err);
    }
  };

  const answerCall = () => {
    setCallAccepted(true);
    // Simple Peer or native RTCPeerConnection logic goes here
    // For this blueprint, we log the intent
    console.log('Answering call from', caller);
  };

  const callUser = (idToCall) => {
    // WebRTC Offer logic
    console.log('Calling user', idToCall);
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) connectionRef.current.destroy();
    window.location.reload();
  };

  const value = {
    stream,
    myVideo,
    userVideo,
    callAccepted,
    callEnded,
    callUser,
    leaveCall,
    answerCall,
    receivingCall,
    caller,
    name,
    requestMedia
  };

  return (
    <WebRTCContext.Provider value={value}>
      {children}
    </WebRTCContext.Provider>
  );
};
