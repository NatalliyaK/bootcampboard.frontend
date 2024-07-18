import styles from './avatar.module.scss';
import {FC} from 'react';

type AvatarProps = {
  firstName: string;
  lastName: string;
};
export const Avatar: FC<AvatarProps> = ({firstName, lastName}) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return <div className={styles.avatar}>{initials.toUpperCase()}</div>;
};
