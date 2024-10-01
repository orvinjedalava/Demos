import gskLogo from '../gsk-logo.png';
import styles from './appbar.module.css';

export default function AppBar() {
    return (
        <div className={styles.appbar}>
            <div className={styles['appbar-logo']}>
                <img src={gskLogo} alt="GSK Logo"/>
            </div>
            <div className={styles['appbar-items']}>
                <a href="#"><span>Company</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Innovation</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Products</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Responsibility</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Media</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Careers</span><i className="fa-solid fa-chevron-down"></i></a>
            </div>
         </div>
    );
}