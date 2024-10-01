import styles from './searchsection.module.css';

export default function SearchSection() {
    return (
        <div className={styles['background-image']}>
            <form className={styles['search-form']}>
                <div className={styles['search-form-bar']}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search for products, brands, etc." />
                    <button className={styles['btn-filter']}>
                        {/* <i className="fa-thin fa-bars-filter"></i> */}
                        <i className="fa-solid fa-filter"></i>
                        <span>Filters</span>
                    </button>
                    <button className={styles['btn-search']} type="submit">Search</button>
                </div>
            </form>
        </div>
    );
}