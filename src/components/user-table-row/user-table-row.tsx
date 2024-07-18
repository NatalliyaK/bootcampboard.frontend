import styles from './user-table-row.module.scss';
import {User} from '../../types/users';
import {FC} from 'react';
import {userRoles} from '../../constants';
import {ActivityPopUp} from '../activity-pop-up';
import {PasswordIcon} from '../icon-components/password-icon';
import {RoleIcon} from '../icon-components/role-icon';
import {DeleteIcon} from '../icon-components/delete-icon';
import classNames from 'classnames';
import {modalContent} from '../../constants';
import {SelectedUserData} from '../users-table';
import {ActivityButton} from '../activity-button';

type UserTableRowProps = {
  user: User;
  isShowActivityPopUp: boolean;
  onClickPopUpTrigger: (userID: string) => void;
  onClosePopUp: () => void;
  onOpenModal: ({modalContent, user}: SelectedUserData) => void;
};

export const UserTableRow: FC<UserTableRowProps> = ({
  user,
  isShowActivityPopUp,
  onClickPopUpTrigger,
  onClosePopUp,
  onOpenModal,
}) => {
  const isSuperAdmin = user.role === userRoles.superAdmin;

  const trClass = classNames(styles.row, {
    [styles.active]: isShowActivityPopUp,
  });

  return (
    <tr className={trClass}>
      <td>{user.lastName}</td>
      <td>{user.firstName}</td>
      <td>{user.userName}</td>
      <td>{user.role}</td>
      <td className={styles.activity}>
        <ActivityButton
          onClick={onClickPopUpTrigger}
          isDisabled={isSuperAdmin}
          id={user.id}
        />
        {isShowActivityPopUp && (
          <div
            className={styles['pop-up-wrapper']}
            onClick={() => {
              onClickPopUpTrigger(user.id);
            }}
            data-target-id={user.id}
          >
            <ActivityPopUp onClose={onClosePopUp} id={user.id}>
              <>
                <button
                  type="button"
                  onClick={() =>
                    onOpenModal({
                      modalContent: modalContent.changePasswordForm,
                      user,
                    })
                  }
                >
                  <PasswordIcon />
                  Change password
                </button>
                <button type="button">
                  <RoleIcon />
                  Change role
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenModal({
                      modalContent: modalContent.deleteUserForm,
                      user,
                    })
                  }
                >
                  <DeleteIcon />
                  Delete
                </button>
              </>
            </ActivityPopUp>
          </div>
        )}
      </td>
    </tr>
  );
};
