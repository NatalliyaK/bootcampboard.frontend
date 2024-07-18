import styles from './users-table.module.scss';
import bootCampBoardAPI from '../../api/bootCampBoardAPI';
import UserTableRow from '../user-table-row';
import AddButton from '../add-button/add-button';
import {useState} from "react";


const UsersTable = () => {
  const [isOpen, setOpen] = useState(false);
  const showModal = () => {
    setOpen(!isOpen);
  };

  const {
    data: users,
    error,
    isLoading,
  } = bootCampBoardAPI.useFetchAllUsersQuery('');

  return (
    <div>
      <section className={styles.wrapper}>
        <h1 className={styles['users-title']}>Users</h1>
        <div className={styles.users}>
          <div className={styles['users-table']}>
            <AddButton
                text={'Add User'}
                onClick={() => {
                  showModal();
                }}
            />
            <table>
              <thead>
              <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Activity</th>
              </tr>
              {isLoading && (
                  <tr>
                    <th>Идет загрузка...</th>
                  </tr>
              )}
              {error && (
                  <tr>
                    <th>Произошла ошибка при загрузке</th>
                  </tr>
              )}
              </thead>
              <tbody>
              {users &&
                  users.map((user) => <UserTableRow key={user.id} user={user} />)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsersTable;