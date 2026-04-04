import { renderLogin } from '../components/authComponent.js';
import $ from 'jquery';

const routes = {
  '/login': renderLogin,
};

export const router = () => {
  const path = location.hash.slice(1) || '/login'
  const render = routes[path];

  if (render) {
    render();
  } else {
    $('#app').html('<h1>404 PAGE NOT FOUND!</h1>')
  }
};
