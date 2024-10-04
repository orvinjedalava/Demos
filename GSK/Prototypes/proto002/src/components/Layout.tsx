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
            <div className={styles['.layout-header-container']}>
                <AppBar toggleSidebar={toggleSidebar} isSidebarExpanded={isSidebarExpanded}/>
            </div>
            <div className={styles.content}>
                <ContentLayout isSidebarExpanded={isSidebarExpanded}/>
            </div>
        </div>
    );
}
