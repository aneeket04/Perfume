import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import styles from './Home.module.css'

export default function Home() {
  const featured = getFeaturedProducts()

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Éclat</h1>
          <p className={styles.heroSubtitle}>Luxury fragrances that define you.</p>
          <Link to="/shop" className={`${styles.btn} ${styles.btnPrimary}`}>
            Explore the collection
          </Link>
        </div>
        <div className={styles.heroOverlay} />
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured fragrances</h2>
          <div className={styles.grid}>
            {featured.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.ctaWrap}>
            <Link to="/shop" className={`${styles.btn} ${styles.btnOutline}`}>
              View all fragrances
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
