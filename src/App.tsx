import {Routes, Route} from 'react-router-dom';
import {LoginPage} from './pages/login-page';
import {ROUTE_PATH} from './routes/routes-paths';
import {Page404} from './pages/404';
import {UsersPage} from './pages/users-page';
import {ProtectedRoute} from './routes/protected-route';
import {MainPage} from './pages/main-page/main-page';
import {ProfilePage} from './pages/profile-page';
import {customHistory} from './routes/customRouter/history';
import {CustomRouter} from './routes/customRouter/customRouter';
import {ModalsAndToasts} from './components/modals-and-notifications';
import {DashboardPage} from './pages/dashboard-page';

export function App() {
  return (
    <>
      <ModalsAndToasts />
      <CustomRouter history={customHistory}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTE_PATH.main} element={<MainPage />} />
            <Route path={ROUTE_PATH.users} element={<UsersPage />} />
            <Route path={ROUTE_PATH.profile} element={<ProfilePage />} />
            <Route path={ROUTE_PATH.dashboard} element={<DashboardPage />} />
          </Route>
          <Route path={ROUTE_PATH.login} element={<LoginPage />} />
          <Route path={ROUTE_PATH.page404} element={<Page404 />} />
        </Routes>
      </CustomRouter>
    </>
  );
}
