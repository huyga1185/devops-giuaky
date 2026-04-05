import $ from 'jquery';
import { jwt } from '../store/store.js';
import { redirect } from '../routers/route.js';
import { checkRole } from '../utils/authUtil.js';

const SERVER = import.meta.env.VITE_SERVER || 'http://localhost:3000';

export const renderLogin = async () => {
  try {
    const role = await checkRole();
    if (role === 'SV') {
      return redirect('/about');
    } else if (role === 'ADMIN') {
      return redirect('/dashboard');
    }
    return;
  } catch (err) {
    console.log(err);
  }
  $('#app').html(`
    <h1> Log In </h1>
    <form id="loginForm">
      <div class="form-group">
        <label for="inputmssv">MSSV</label>
        <input type="text" class="form-control" id="mssvinput">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input type="password" class="form-control" id="inputPassword">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `);

  $('#loginForm').on('submit', async (e) => {
    e.preventDefault();
    const mssv = $('#mssvinput').val();
    const password = $('#inputPassword').val();

    try {
      const res = await fetch(`${SERVER}/api/auth/login`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mssv, password })
      });

      const data = await res.json();

      if (data.accessToken) {
        jwt.set(data.accessToken);
        redirect('/about');
      } else {
        alert(data.message);
      }
    } catch(err) {
      console.log(err);
    }
  });
};


export const renderAdminLogin = async () => {
  try {
    const role = await checkRole();
    if (role === 'SV') {
      return redirect('/about');
    } else if (role === 'ADMIN') {
      return redirect('/dashboard');
    }
    return;
  } catch (err) {
    console.log(err);
  }
  $('#app').html(`
    <h1> Admin Log In </h1>
    <form id="loginForm">
      <div class="form-group">
        <label for="inputUsername">Username</label>
        <input type="text" class="form-control" id="inputUsername">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input type="password" class="form-control" id="inputPassword">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `);

  $('#loginForm').on('submit', async (e) => {
    e.preventDefault();
    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();

    try {
      const res = await fetch(`${SERVER}/api/auth/admin-login`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.accessToken) {
        jwt.set(data.accessToken);
        return redirect('/dashboard');
      } else {
        alert(data.message);
      }
    } catch(err) {
      console.log(err);
    }
  });
};