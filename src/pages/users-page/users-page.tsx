import commonStyles from '../common-styles/common-styles.module.scss';
import styles from './users-page.module.scss';
import {Header} from '../../components/header';
import {useAppSelector} from '../../store/hooks/redux-hooks';
import {stateSelectors} from '../../store/store';
import {UsersTable} from '../../components/users-table';
import {useGetUserProfileQuery} from '../../api/endpoints';
import {FC, useEffect, useState} from 'react';
import {userRoles} from '../../constants';
import {useNavigate} from 'react-router-dom';
import {ROUTE_PATH} from '../../routes/routes-paths';
import {PageTitle} from '../../components/page-title';
import classNames from 'classnames';

export const UsersPage: FC = () => {
  const navigate = useNavigate();
  useGetUserProfileQuery();

  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const {isLogged, role} = useAppSelector(stateSelectors.currentUserSliceData);

  const contentClasses = classNames(commonStyles.content, styles.content);

  useEffect(() => {
    const isNotAllowed = isLogged && role !== userRoles.superAdmin;
    isNotAllowed ? navigate(ROUTE_PATH.profile) : setIsSuperAdmin(true);
  }, [navigate, role, isLogged]);

  return (
    <>
      {isSuperAdmin && (
        <>
          <Header />
          <div className={contentClasses}>
            <PageTitle title="Users" />
            <UsersTable />
          </div>
        </>
      )}
    </>
  );
};
