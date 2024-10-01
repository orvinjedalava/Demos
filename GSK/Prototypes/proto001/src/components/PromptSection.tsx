import styles from './promptsection.module.css';

export default function PromptSection() {
    return (
        <div className={styles['background-image']}>
            <form className={styles['search-form']}>
                <div className={styles['search-form-bar']}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Compose a prompt here and click Generate" />
                    <button className={styles['btn-filter']}>
                        {/* <i className="fa-thin fa-bars-filter"></i> */}
                        <i className="fa-solid fa-filter"></i>
                        <span>Filters</span>
                    </button>
                    <button className={styles['btn-generate']} type="submit">Generate</button>
                </div>
            </form>
        </div>
    );
}