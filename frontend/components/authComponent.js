import $ from 'jquery';
import { jwt } from '../store/store.js';
import { jwtDecode } from 'jwt-decode';

const SERVER = import.meta.env.VITE_SERVER || 'http://localhost:3000';

export const renderLogin = () => {
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
        const payload = jwtDecode(data.accessToken);
        if (payload.role === 'SV') {
          location.hash = '/about';
        } else if (payload.role === 'ADMIN') {
          location.hash = '/dashboard';
        }
      } else {
        alert(data.message);
      }
    } catch(err) {
      console.log(err);
    }
  });
};
