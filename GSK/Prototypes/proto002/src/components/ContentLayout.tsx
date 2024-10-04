import styles from './contentlayout.module.css';
import { useEffect, useRef } from 'react';

type ContentLayoutProps = {
    toggleSidebarState: boolean;
}

export default function ContentLayout({toggleSidebarState}: ContentLayoutProps) {

    useEffect(() => {
        // console.log('MainLayout isExpanded:', toggleSidebarState);
        if (sidebarContainerRef.current) {
            sidebarContainerRef.current.classList.toggle(styles.expanded);
        }

    }, [toggleSidebarState]);

    const sidebarContainerRef = useRef<HTMLDivElement>(null);


    return(
        <div className={styles['contentlayout-container']}>
            <div className={styles['sidebar-container']} ref={sidebarContainerRef}>
                Sidebar
            </div>
            <div className={styles['image-gallery-container']}>
                Image Gallery
            </div>
        </div>
    );
}