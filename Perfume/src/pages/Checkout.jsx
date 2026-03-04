import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Checkout.module.css'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  })

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }
    if (step === 2) {
      setOrderComplete(true)
      clearCart()
    }
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className={styles.empty}>
        <div className="container">
          <h2>Your cart is empty</h2>
          <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className={styles.thankYou}>
        <div className="container">
          <div className={styles.thankYouCard}>
            <h1 className={styles.thankYouTitle}>Thank you for your order</h1>
            <p className={styles.thankYouText}>
              This is a mock checkout. No payment was processed. Your order confirmation would be sent to your email.
            </p>
            <Link to="/shop" className="btn btn-primary" onClick={() => navigate('/shop')}>
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.checkout}>
      <div className="container">
        <Link to="/cart" className={styles.backLink}>← Back to cart</Link>
        <h1 className={styles.title}>Checkout</h1>

        <div className={styles.steps}>
          <span className={step >= 1 ? styles.stepActive : ''}>1. Shipping</span>
          <span className={styles.stepDivider}>/</span>
          <span className={step >= 2 ? styles.stepActive : ''}>2. Payment</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.formWrap}>
          <div className={styles.main}>
            {step === 1 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Contact</h2>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    required
                  />
                </div>
                <h2 className={styles.sectionTitle}>Shipping address</h2>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="firstName">First name</label>
                    <input
                      id="firstName"
                      value={form.firstName}
                      onChange={(e) => updateForm('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="lastName">Last name</label>
                    <input
                      id="lastName"
                      value={form.lastName}
                      onChange={(e) => updateForm('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    placeholder="Street address"
                    value={form.address}
                    onChange={(e) => updateForm('address', e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="apartment">Apartment, suite, etc. (optional)</label>
                  <input
                    id="apartment"
                    value={form.apartment}
                    onChange={(e) => updateForm('apartment', e.target.value)}
                  />
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      value={form.city}
                      onChange={(e) => updateForm('city', e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      value={form.country}
                      onChange={(e) => updateForm('country', e.target.value)}
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="state">State</label>
                    <input
                      id="state"
                      placeholder="State / Province"
                      value={form.state}
                      onChange={(e) => updateForm('state', e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="zip">ZIP code</label>
                    <input
                      id="zip"
                      value={form.zip}
                      onChange={(e) => updateForm('zip', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Payment</h2>
                <p className={styles.mockNote}>This is a mock checkout. No real payment will be processed.</p>
                <div className={styles.field}>
                  <label htmlFor="cardNumber">Card number</label>
                  <input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={form.cardNumber}
                    onChange={(e) => updateForm('cardNumber', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="cardName">Name on card</label>
                  <input
                    id="cardName"
                    value={form.cardName}
                    onChange={(e) => updateForm('cardName', e.target.value)}
                  />
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="expiry">Expiry (MM/YY)</label>
                    <input
                      id="expiry"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => updateForm('expiry', e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="cvc">CVC</label>
                    <input
                      id="cvc"
                      placeholder="123"
                      value={form.cvc}
                      onChange={(e) => updateForm('cvc', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.orderSummary}>
              <h3 className={styles.summaryTitle}>Order summary</h3>
              <ul className={styles.summaryList}>
                {cart.map((item) => (
                  <li key={item.id} className={styles.summaryItem}>
                    <span className={styles.summaryItemInfo}>
                      <span className={styles.summaryItemName}>{item.name}</span>
                      <span className={styles.summaryItemQty}>×{item.quantity}</span>
                    </span>
                    <span className={styles.summaryItemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>—</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                {step === 1 ? 'Continue to payment' : 'Place order (mock)'}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </div>
  )
}
