import React, { FC } from 'react';
import styles from './add-button.module.scss';
import AddUser from '../icon-components/add'
interface ButtonProps {
    text: string;
    onClick: () => void;
}

const AddButton : FC<ButtonProps> = (props) => {
    const { text, onClick } = props;
    return (
        <button type='button'
            className={styles.button}
            onClick={onClick}>
            <AddUser />
            {text}
        </button>
    );
};

export default AddButton;