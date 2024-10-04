import styles from './contentlayout.module.css';
import { useEffect, useRef } from 'react';

type ContentLayoutProps = {
    isSidebarExpanded: boolean;
}

export default function ContentLayout({isSidebarExpanded}: ContentLayoutProps) {

    useEffect(() => {
        if (sidebarContainerRef.current) {
            if (isSidebarExpanded) {
                sidebarContainerRef.current.classList.add(styles.expanded);
            } else {
                sidebarContainerRef.current.classList.remove(styles.expanded);
            }

        }

    }, [isSidebarExpanded]);

    const sidebarContainerRef = useRef<HTMLDivElement>(null);

    return(
        <div className={styles['contentlayout-container']}>
            <div className={styles['contentlayout-sidebar-container']} ref={sidebarContainerRef}>
                Sidebar
            </div>
            <div className={styles['contentlayout-image-gallery-container']}>
                Image Gallery
            </div>
        </div>
    );
}