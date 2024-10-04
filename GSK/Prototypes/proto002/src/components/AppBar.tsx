import gskLogo from '../temporary/gsk-logo.png';
import styles from './appbar.module.css';
import avatarImg from '../temporary/img_avatar.png';
import { useEffect, useRef } from 'react';


type AppBarProps = {
    toggleSidebar: () => void;
    isSidebarExpanded: boolean;
}

export default function AppBar({ toggleSidebar, isSidebarExpanded }: AppBarProps) {

    const handleToggleClick = () => {
        toggleSidebar();
    }

    const sidebarContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sidebarContainerRef.current) {
            if (isSidebarExpanded) {
                sidebarContainerRef.current.classList.add(styles.expanded);
            } else {
                sidebarContainerRef.current.classList.remove(styles.expanded);
            }

        }

    }, [isSidebarExpanded]);

    return (
        <div className={styles['appbar-container']}>
            
            <div className={styles['appbar-sidebar-toggle']} onClick={handleToggleClick} ref={sidebarContainerRef}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    className={styles['open-icon']}
                    viewBox="0 0 24 24"  
                    height="24" width="24" focusable="false" aria-hidden="true" >
                    <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
                </svg>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={styles['close-icon']}
                    viewBox="0 0 24 24" 
                    stroke="#4d4b4c" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span>Filters</span>
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
                {/* <a href="#"><span>About</span><i className="fa-solid fa-chevron-down"></i></a>
                <a href="#"><span>Help</span><i className="fa-solid fa-chevron-down"></i></a> */}
                <img src={avatarImg} alt="Avatar" className={styles.avatar}/>
            </div>
         </div>
    );
}