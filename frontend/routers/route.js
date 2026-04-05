import { renderLogin, renderAdminLogin } from '../components/authComponent.js';
import $ from 'jquery';
import { renderAbout } from '../components/aboutComponent.js';
import { renderDashboard } from '../components/dashboardComponent.js';

const routes = {
  '/login': renderLogin,
  '/admin-login': renderAdminLogin,
  '/about': renderAbout,
  '/dashboard': renderDashboard
};

export const router = async () => {
  const path = window.location.pathname;
  const render = routes[path];

  if (path === '/') {
    return redirect('/login');
  }

  if (render) {
    render();
  } else {
    $('#app').html('<h1>404 PAGE NOT FOUND!</h1>')
  }
};

window.addEventListener('popstate', router);

export const redirect = (path) => {
  history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
};