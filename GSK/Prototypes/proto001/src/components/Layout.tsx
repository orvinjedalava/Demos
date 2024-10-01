import styles from './layout.module.css';
import AppBar from './AppBar';

export default function Layout() {
    return (
        <div>
            <div className={styles.header}>
                <div className="appbarcontainer">
                    <AppBar />
                </div>
                <div className="filterbarcontainer"></div>
            </div>
            <div className={styles.main}>
                
            </div>
        </div>
    );
}