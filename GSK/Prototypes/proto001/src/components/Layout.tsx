import styles from './layout.module.css';
import AppBar from './AppBar';
import PromptSection from './PromptSection';
import { useRef } from 'react';

export default function Layout() {

    const promptFilterOverlayRef = useRef<HTMLDivElement>(null);

    const handleButtonFilterClick = () => {
        if (promptFilterOverlayRef.current) {
            promptFilterOverlayRef.current.classList.toggle(styles.active);
        }
    }

    const handlePromptFilterOverlayClick = () => {
        if (promptFilterOverlayRef.current) {
            promptFilterOverlayRef.current.classList.toggle(styles.active);
        }
    }

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
                    <PromptSection handleButtonFilterClick={handleButtonFilterClick}/>
                </div>
            </div>
            <div className={styles['prompt-filter-overlay']} ref={promptFilterOverlayRef} onClick={handlePromptFilterOverlayClick}></div>
        </div>
    );
}