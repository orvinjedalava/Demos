import styles from './layout.module.css';
import AppBar from './AppBar';
import PromptSection from './PromptSection';

export default function Layout() {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className="appbar-container">
                    <AppBar />
                </div>
                <div className="filterbar-container"></div>
            </div>
            <div className={styles.main}>
                <div className={styles['search-section-container']}>
                    <PromptSection />
                </div>
            </div>
        </div>
    );
}