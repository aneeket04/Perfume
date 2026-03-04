import { useState } from 'react'
import { getProductsByCategory } from '../data/products'
import ProductCard from '../components/ProductCard'
import styles from './Shop.module.css'

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
]

export default function Shop() {
  const [category, setCategory] = useState('')
  const products = getProductsByCategory(category)

  return (
    <div className={styles.shop}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Shop fragrances</h1>
          <div className={styles.filters}>
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                className={category === c.value ? styles.filterActive : styles.filterBtn}
                onClick={() => setCategory(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </header>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
