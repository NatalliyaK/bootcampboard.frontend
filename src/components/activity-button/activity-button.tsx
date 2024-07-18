import styles from './activity-button.module.scss';
import {FC} from 'react';

type Props = {
  onClick: (id: string) => void;
  id: string;
  isDisabled?: boolean;
};

export const ActivityButton: FC<Props> = ({
  onClick,
  id,
  isDisabled = false,
}) => (
  <button
    className={styles['user-menu']}
    type="button"
    onClick={() => {
      onClick(id);
    }}
    disabled={isDisabled}
    data-target-id={id}
  ></button>
);
