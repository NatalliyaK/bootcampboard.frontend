import {Outlet, Navigate} from 'react-router-dom';
import {ROUTE_PATH} from './routes-paths';
import {LocalStorageService} from '../services/local-storage-service';

export const ProtectedRoute = () => {
  const isHaveAccessToken = LocalStorageService.getAccessToken();
  return isHaveAccessToken ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE_PATH.login}></Navigate>
  );
};
