import styles from './promptfilterdialog.module.css';

interface PromptFilterDialogProps {
    handlePromptModalDialogClose: () => void;
}

export default function PromptFilterDialog({handlePromptModalDialogClose}: PromptFilterDialogProps) {
    return (
        <div className={styles['dialog-container']}>
            <form>
                <div className={styles['header-container']}>
                    <span>Filters</span>
                    <button className={styles['close-button']} onClick={handlePromptModalDialogClose}>&times;</button>
                </div>
                <hr/>
                <div className={styles['section-title-container']}>
                    <span>Conditions</span>
                </div>
                <div className={styles['section-conditions-container']}>
                    <div className={styles["column"]}>
                        <label className={styles['styled-checkbox']}>
                            <input type="checkbox" name="option1" value="1" />
                            <span className={styles['checkmark']}></span> Heart disease
                        </label>
                        <label className={styles['styled-checkbox']}>
                            <input type="checkbox" name="option2" value="2" />
                            <span className={styles['checkmark']}></span> High blood pressure
                        </label>
                        <label className={styles['styled-checkbox']}>
                            <input type="checkbox" name="option3" value="3" />
                            <span className={styles['checkmark']}></span> Respiratory disease
                        </label>
                    </div>
                    <div className={styles["column"]}>
                        <label className={styles['styled-checkbox']}>
                            <input type="checkbox" name="option4" value="4" />
                            <span className={styles['checkmark']}></span> Diabetes
                        </label>
                        <label className={styles['styled-checkbox']}>
                            <input type="checkbox" name="option5" value="5" />
                            <span className={styles['checkmark']}></span> Sensory impairment
                        </label>
                        <label className={styles['styled-checkbox']}>
                            <input type="checkbox" name="option6" value="6" />
                            <span className={styles['checkmark']}></span> Respiratory disease
                        </label>
                    </div>
                </div>
                <hr/>
                <div className="keywords-container">
                    <label>Keywords</label>
                </div>
                <div className="center-textbox">
                    <input type="text" placeholder="Enter text here" />
                </div>
            </form>
        </div>
    );
}