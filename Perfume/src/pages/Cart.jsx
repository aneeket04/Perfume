import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Cart.module.css'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <div className="container">
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyText}>Discover our collection of luxury fragrances.</p>
          <Link to="/shop" className="btn btn-primary">
            Shop now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cart}>
      <div className="container">
        <h1 className={styles.title}>Shopping cart</h1>
        <div className={styles.content}>
          <ul className={styles.list}>
            {cart.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemBrand}>{item.brand}</p>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemSize}>{item.size}</p>
                  <div className={styles.itemActions}>
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className={styles.qtySelect}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <aside className={styles.sidebar}>
            <div className={styles.summary}>
              <h3 className={styles.summaryTitle}>Order summary</h3>
              <div className={styles.summaryRow}>
                <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
                Proceed to checkout
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
