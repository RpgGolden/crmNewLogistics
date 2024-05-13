import React from "react";
import styles from "./PopUpContainer.module.scss";
import DataContext from "../../context";

function PopUpContainer({ children, title }) {
    const { context } = React.useContext(DataContext);

    return (
        <div className={styles.PopUpContainer}>
            <div className={styles.PopUpContainerflex}>
                <div className={styles.PopUpContainerInner}>
                    <div className={styles.HeaderPopUp}>
                        <div className={styles.HeaderPopUpTitle}>
                            <h3>{title}</h3>
                        </div>
                        <div>
                            <button onClick={(()=>context.setpopUp(""))}>X</button>
                        </div>
                    </div>

                    <div>
                        {children}
                    </div>
                  
                </div>
            </div>
        </div>
    );
}

export default PopUpContainer;
