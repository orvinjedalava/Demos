import styles from './layout.module.css';
import AppBar from './AppBar';
import PromptSection from './PromptSection';
import { useRef } from 'react';
import PromptFilterDialog from './PromptFilterDialog';

export default function Layout() {

    const promptFilterOverlayRef = useRef<HTMLDivElement>(null);
    const promptModalDialogRef = useRef<HTMLDivElement>(null);

    const toggleFilterDialog = () => {
        if (promptFilterOverlayRef.current) {
            promptFilterOverlayRef.current.classList.toggle(styles.active);
        }
        if (promptModalDialogRef.current) {
            promptModalDialogRef.current.classList.toggle(styles.active);
        }
    }

    const handleButtonFilterClick = () => {
        toggleFilterDialog();
    }

    const handlePromptFilterOverlayClick = () => {
        toggleFilterDialog();
    }
    
    const handlePromptModalDialogClose = () => {
        toggleFilterDialog();
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
            <div className={styles['prompt-filter-modal']} ref={promptModalDialogRef}>
                {/* <div className={styles['prompt-filter-modal-header']}>
                    <div className={styles['title']}>Filters</div>
                    <button className={styles['close-button']} onClick={handlePromptModalDialogClose}>&times;</button>
                </div>
                <div className={styles['prompt-filter-modal-body']}>
                    This is a modal dialog
                </div> */}
                <PromptFilterDialog handlePromptModalDialogClose={handlePromptModalDialogClose}/>
            </div>

            <div id={styles['prompt-filter-overlay']} ref={promptFilterOverlayRef} onClick={handlePromptFilterOverlayClick}></div>
        </div>
    );
}