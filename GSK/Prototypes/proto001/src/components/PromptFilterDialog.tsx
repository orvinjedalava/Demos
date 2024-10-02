import styles from './promptfilterdialog.module.css';

interface PromptFilterDialogProps {
    handlePromptModalDialogClose: () => void;
}

export default function PromptFilterDialog({handlePromptModalDialogClose}: PromptFilterDialogProps) {
    return (
        <div>
            <form>
                <div className={styles['header-container']}>
                    <span>Filters</span>
                    <button className={styles['close-button']} onClick={handlePromptModalDialogClose}>&times;</button>
                </div>
                <hr/>
                <div className="label-container">
                    <label>Disease types</label>
                </div>
                <div className="form-container">
                    <div className="column">
                        <label>
                            <input type="checkbox" name="option1" value="1" />
                            <span className="checkmark"></span> Option 1
                        </label>
                        <label>
                            <input type="checkbox" name="option2" value="2" />
                            <span className="checkmark"></span> Option 2
                        </label>
                        <label>
                            <input type="checkbox" name="option3" value="3" />
                            <span className="checkmark"></span> Option 3
                        </label>
                    </div>
                    <div className="column">
                        <label>
                            <input type="checkbox" name="option4" value="4" />
                            <span className="checkmark"></span> Option 4
                        </label>
                        <label>
                            <input type="checkbox" name="option5" value="5" />
                            <span className="checkmark"></span> Option 5
                        </label>
                        <label>
                            <input type="checkbox" name="option6" value="6" />
                            <span className="checkmark"></span> Option 6
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