import styles from './promptsection.module.css';
import { usePromptContext } from '../contexts/PromptContext';

interface PrompSectionProps {
    handleButtonFilterClick: () => void;
}

export default function PromptSection({handleButtonFilterClick}: PrompSectionProps) {

    return (
        <div className={styles['background-image']}>
            <div className={styles['prompt-container']}>
                <div className={styles['prompt-container-bar']}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Compose a prompt here and click Generate" />
                    <button className={styles['btn-filter']} onClick={handleButtonFilterClick}>
                        {/* <i className="fa-thin fa-bars-filter"></i> */}
                        <i className="fa-solid fa-filter"></i>
                        <span>Filters</span>
                    </button>
                    <button className={styles['btn-generate']} type="submit">Generate</button>
                </div>
            </div>
        </div>
    );
}