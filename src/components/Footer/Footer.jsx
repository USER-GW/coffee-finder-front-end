

import '../../App.css'
import styles from './Footer.module.css'
const Footer = () => {
    return (
 <section className={styles.footer}>
            <div className={styles.footerContainer}>
                <h2 className={styles.footerTitle}>Nooks & Brews</h2>
                <p className={styles.footerText}>Discover and rate the best brews in your nook of the woods</p>
    
            </div>
        </section>
    )
}

export default Footer