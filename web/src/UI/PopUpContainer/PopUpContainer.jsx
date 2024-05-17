import React from "react";
import styles from "./PopUpContainer.module.scss";
import DataContext from "../../context";

function PopUpContainer({ children, title,mT }) {
    const { context } = React.useContext(DataContext);

    return (
        <div style={{paddingTop:`${mT}px`}} className={styles.PopUpContainer}>
            <div className={styles.PopUpContainerflex}>
                <div className={styles.PopUpContainerInner}>
                    <div className={styles.HeaderPopUp}>
                        <div className={styles.HeaderPopUpTitle}>
                            <h2>{title}</h2>
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
