import styles from './profile-for-user.module.scss';
import {Note} from '../icon-components/note';
import {Avatar} from '../avatar';
import {useAppSelector} from '../../store/hooks/redux-hooks';
import {stateSelectors} from '../../store/store';
import {useEffect, useState} from 'react';
import {ModalWindow} from '../modal-window';
import {EditProfileForm} from '../edit-profile-form';
import {ModalSuccess} from '../modal-success';

export const ProfileForUser = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTransparent, setTransparent] = useState(false);
  const [modalSuccessUserName, setModalSuccessUserName] = useState('');
  const onChangeModalTransparent = (isTransparent: boolean) => {
    setTransparent(isTransparent);
  };

  const onCloseFormHandler = (userName?: string) => {
    setModalOpen(false);
    if (userName) {
      setModalSuccessUserName(userName);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  }, [isModalOpen]);

  const {userName, firstName, lastName, roleName, email} = useAppSelector(
    stateSelectors.currentUserSliceData,
  );
  return (
    <div>
      <section className={styles.wrapper}>
        <h1 className={styles['profile__title']}>Profile</h1>
        <div className={styles.profile}>
          <div className={styles['profile__icon-container']}>
            <div className={styles['profile__icon']}>
              <Avatar firstName={firstName} lastName={lastName} />
            </div>
            <div className={styles['profile__name']}>
              <div>{`${firstName} ${lastName}`}</div>
              <div>{roleName}</div>
            </div>
          </div>
          <div className={styles['profile__information']}>
            <div className={styles['profile__information-title']}>
              <h2 className={styles['profile__subtitle']}>Personal info</h2>
              <div className={styles['profile__note']}>
                <Note onClick={() => setModalOpen(true)} />
              </div>
            </div>
            <div className={styles['profile__information-user']}>
              <table>
                <tbody>
                  <tr>
                    <td>Last Name</td>
                    <td>{firstName}</td>
                  </tr>
                  <tr>
                    <td>First Name</td>
                    <td>{lastName}</td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td>{userName}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <ModalWindow
          isVisible={true}
          isTransparent={isTransparent}
          isSmallForm={true}
        >
          <EditProfileForm
            onClose={onCloseFormHandler}
            onSetTransparent={onChangeModalTransparent}
          />
        </ModalWindow>
      )}

      <ModalSuccess userName={modalSuccessUserName} />
    </div>
  );
};
