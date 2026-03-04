import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'
import styles from './ProductDetail.module.css'

export default function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = getProductById(productId)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button className="btn btn-outline" onClick={() => navigate('/shop')}>
          Back to shop
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.imageSection}>
            <img src={product.image} alt={product.name} className={styles.image} />
          </div>
          <div className={styles.details}>
            <p className={styles.brand}>{product.brand}</p>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.size}>{product.size}</p>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.notes}>
              <span className={styles.notesLabel}>Notes:</span> {product.notes}
            </div>
            <div className={styles.actions}>
              <div className={styles.quantity}>
                <label htmlFor="qty">Quantity</label>
                <select
                  id="qty"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={styles.select}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className={`btn btn-primary ${styles.addBtn}`}
                onClick={handleAddToCart}
              >
                {added ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate('/cart')}
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
