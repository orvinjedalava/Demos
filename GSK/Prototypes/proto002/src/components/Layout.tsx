import styles from './layout.module.css';
import AppBar from './AppBar';

export default function Layout() {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className="appbar-container">
                    <AppBar />
                </div>
            </div>
            <div className={styles.main}>
                
            </div>
        </div>
    );
}
