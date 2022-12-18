import IRoute from '../interfaces/route.interface';
import SignUpPage from '../pages/auth/SignUpPage';
import Login from '../pages/auth/Login';
import Reset from '../pages/auth/Reset';
import HomePage from '../pages/HomePage';
import ManagerPage from '../pages/ManagerPage';
import { SystemHome } from '../pages/systemHome';

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: HomePage,
        name: 'Home Page',
        protected: false
    }, {
        path: '/auth/signup',
        exact: true,
        component: SignUpPage,
        name: 'Sign Up Page',
        protected: false
    }, {
        path: '/auth/login',
        exact: true,
        component: Login,
        name: 'Login Page',
        protected: false
    }, {
        path: '/auth/reset',
        exact: true,
        component: Reset,
        name: 'Reset Page',
        protected: false
    },  {
        path: '/managerPage',
        exact: true,
        component: ManagerPage,
        name: 'Manager Page',
        protected: false
    },   {
        path: '/:systemUrl',
        exact: true,
        component: SystemHome,
        name: 'System Page',
        protected: false
    },

];
export default routes;