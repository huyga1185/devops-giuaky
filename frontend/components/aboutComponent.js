import $ from 'jquery';
import { checkRole, fetchWithRefresh } from '../utils/authUtil.js';
import { redirect } from '../routers/route';
import { jwt } from '../store/store.js';

const SERVER = import.meta.env.VITE_SERVER || 'http://localhost:3000';

export const renderAbout = async () => {
    try {
        const role = await checkRole();
        if (role === 'ADMIN') {
            return redirect('/dashboard');
        } else if (role !== 'SV') {
            return redirect('/login');
        }
    } catch (err) {
        console.log(err);
        return redirect('/login');
    }
    $('#app').html(`
        <table class="table">
            <thead>
                <tr>
                <th scope="col">HoTen</th>
                <th scope="col">Mssv</th>
                <th scope="col">Lop</th>
                </tr>
            </thead>
            <tbody id="about">
            </tbody>
        </table>
    `);

    try {
        const response = await fetchWithRefresh(`${SERVER}/api/sv/about`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.get()}`  
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            $('#about').append(`
                <tr>
                    <td>${data.hoten}</td>
                    <td>${data.mssv}</td>
                    <td>${data.lop}</td>
                </tr>
            `);
        }
    } catch (err) {
        console.log(err);
    }
};