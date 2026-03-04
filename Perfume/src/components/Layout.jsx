import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  const { cartCount } = useCart()
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            Éclat
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={location.pathname === '/' ? styles.navActive : ''}>
              Home
            </Link>
            <Link to="/shop" className={location.pathname.startsWith('/shop') && location.pathname === '/shop' ? styles.navActive : ''}>
              Shop
            </Link>
            <Link to="/cart" className={styles.cartLink}>
              Cart
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLogo}>Éclat</span>
          <p className={styles.footerTagline}>Luxury fragrances for the discerning.</p>
          <div className={styles.footerLinks}>
            <a href="#/">Contact</a>
            <a href="#/">Shipping</a>
            <a href="#/">Returns</a>
          </div>
          <p className={styles.copyright}>© {new Date().getFullYear()} Éclat. Mock e-commerce demo.</p>
        </div>
      </footer>
    </div>
  )
}
