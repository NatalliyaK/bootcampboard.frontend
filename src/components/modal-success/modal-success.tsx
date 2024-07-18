import React, {FC, useEffect, useState} from 'react';
import styles from './modal-success.module.scss';
import Success from "../icon-components/success";

interface ModalProps {
    userName: string;
}

const ModalSuccess: FC<ModalProps> = (props) => {
    const { userName} = props;
    const [showClass, setShowClass] = useState(`${styles.success} ${styles['success-hide']}`);

    useEffect(() => {
        if (userName !== '') {
            let timerId: NodeJS.Timeout;
            setShowClass(`${styles.success}`)
            // eslint-disable-next-line prefer-const
            timerId = setTimeout(() => {
                setShowClass(`${styles.success} ${styles['success-hide']}`)
            }, 3000);

            return () => {
                clearTimeout(timerId);
            };
        }

    }, [userName]);

    return (
        <div className={showClass}>
            <div className={styles['success-icon']}><Success /></div>
            <p>The new User {userName} has been added successfully</p>
        </div>
    );
};

export default ModalSuccess;