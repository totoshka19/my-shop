import styles from '../Layout/Layout.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-custom-taupe-dark text-custom-pink-extra-light py-4 w-full text-center">
      <div className={styles.container}>
        <p>© {currentYear} My Shop</p>
      </div>
    </footer>
  );
}

export default Footer;
