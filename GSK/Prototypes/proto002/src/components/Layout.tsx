import styles from './layout.module.css';
import AppBar from './AppBar';
import ContentLayout from './ContentLayout';
import { useState } from 'react';

export default function Layout() {

    const [isSidebarExpanded, setToggleSidebarState] = useState(true);

    const toggleSidebar = () => {
        console.log('Toggle Sidebar State');
        setToggleSidebarState(prevValue => !prevValue);
    }


    return (
        <div className={styles['layout-container']}>
            <div className={styles.header}>
                <div className="appbar-container">
                    <AppBar toggleSidebar={toggleSidebar}/>
                </div>
            </div>
            <div className={styles.content}>
                <ContentLayout isSidebarExpanded={isSidebarExpanded}/>
            </div>
        </div>
    );
}
