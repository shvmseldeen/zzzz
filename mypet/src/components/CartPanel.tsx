import { useApp } from '../lib/AppContext';

export default function CartPanel() {
  const { cart, cartOpen, toggleCart, removeFromCart, updateCartQty, checkout } = useApp();

  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  return (
    <>
      {cartOpen && (
        <div
          className="fixed inset-0 z-[70] bg-navy-500/40"
          onClick={toggleCart}
        />
      )}
      <div
        className={`fixed top-0 right-0 w-full max-w-md h-full z-[80] bg-ivory-100 shadow-2xl flex flex-col transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-ivory-300">
          <h3 className="text-lg font-bold text-navy-500">
            <i className="fas fa-shopping-bag mr-2 text-gold-400"></i>Your Cart
          </h3>
          <button onClick={toggleCart} className="p-2 text-navy-500 hover:text-gold-400 transition-colors">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <i className="fas fa-shopping-bag text-4xl text-ivory-400 mb-4"></i>
              <p className="text-navy-200 font-medium">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center bg-ivory-50 rounded-xl p-3 border border-ivory-300">
                  <img src={item.img} className="w-16 h-16 rounded-lg object-cover" alt={item.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-500 truncate">{item.name}</p>
                    <p className="text-sm text-gold-400 font-bold">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateCartQty(item.id, -1)} className="w-6 h-6 rounded-md bg-ivory-200 text-navy-500 flex items-center justify-center text-xs hover:bg-ivory-300 transition-colors">−</button>
                      <span className="text-xs font-semibold text-navy-500">{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} className="w-6 h-6 rounded-md bg-ivory-200 text-navy-500 flex items-center justify-center text-xs hover:bg-ivory-300 transition-colors">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-navy-200 hover:text-red-400 transition-colors">
                    <i className="fas fa-trash-alt text-sm"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {totalItems > 0 && (
          <div className="border-t border-ivory-300 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-navy-500">Total</span>
              <span className="text-xl font-bold text-gold-400">${totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={checkout} className="w-full btn-gold py-3 rounded-xl font-semibold text-sm uppercase tracking-wider">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
