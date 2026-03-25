import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    clearCart
  } = useCart();

  // 🧠 Empty Cart UI
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 text-sm">Add some products to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">🛒 Your Cart</h2>
          <button
            onClick={clearCart}
            className="text-red-500 font-bold text-sm hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT: Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border"
              >
                {/* Image */}
                <div className="text-4xl">
                  {item.image || "🔮"}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span className="font-bold">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ₹{item.price * item.qty}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-xs mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border h-fit">
            <h3 className="text-lg font-bold mb-4">Price Details</h3>

            <div className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-black text-lg">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button className="w-full mt-6 bg-[#ffdb42] py-3 rounded-lg font-bold hover:shadow-md">
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;