import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { router } from './routers/route.js';

$(document).ready(() => {
  router();

  $(window).on('popstate', router);
});
