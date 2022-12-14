import Link from 'next/link'
import styles from './product-nav.module.scss'
import { ProductPostType } from '../lib/data/types'

export default function ProductNav({
  products,
  light = false
}: {
  products: ProductPostType[]
  light?: boolean
}) {
  return (
    <nav className={styles.nav}>
      <h4 className={styles.navTitle}>Products</h4>
      <ul className={styles.navMenu}>
        {products.map((product) => (
          <li className={styles.navItem} key={product.id}>
            <Link
              href={product.slug}
              className={
                light ? `${styles.navLink} ${styles.light}` : styles.navLink
              }
            >
              {product.title.rendered}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
