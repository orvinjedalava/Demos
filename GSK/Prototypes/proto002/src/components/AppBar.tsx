import gskLogo from '../gsk-logo.png';
import styles from './appbar.module.css';

export default function AppBar() {
    return (
        <div className={styles.appbar}>
            
            <div className={styles['sidebar-toggle']}>
                {/* <i className="fa-solid fa-bars"></i> */}
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="menu-icon"
                    viewBox="0 0 24 24"  
                    height="24" width="24" focusable="false" aria-hidden="true" >
                    <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
                </svg>
            </div>
            <div className={styles['appbar-logo']}>
                <img src={gskLogo} alt="GSK Logo"/>
            </div>
            <div className={styles['appbar-items']}>
                {/* <a href="#"><span>Company</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Innovation</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Products</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Responsibility</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Media</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Careers</span><i className="fa-solid fa-chevron-down"></i></a> */}
                <a href="#"><span>About</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Help</span><i className="fa-solid fa-chevron-down"></i></a>
            </div>
         </div>
    );
}