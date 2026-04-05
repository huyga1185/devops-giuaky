import $ from 'jquery';
import { checkRole, fetchWithRefresh } from '../utils/authUtil.js';
import { redirect } from '../routers/route.js';
import { jwt } from '../store/store.js';

const SERVER = import.meta.env.VITE_SERVER || 'http://localhost:3000';

export const renderDashboard = async () => {
    try {
        const role = await checkRole();
        if (role === 'SV') {
            return redirect('/about');
        } else if (role !== 'ADMIN') {
            return redirect('/login');
        }
    } catch (err) {
        console.log(err);
        return redirect('/login');
    }
    $('#app').html(`
        <h1>Add sinh vien and tai khoan!</h1>
        <form id="form">
            <div class="form-group">
                <label for="inputmssv">MSSV</label>
                <input type="text" class="form-control" id="mssvinput">
            </div>
            <div class="form-group">
                <label for="inputHoTen">Ho ten</label>
                <input type="text" class="form-control" id="inputHoTen">
            </div>
            <div class="form-group">
                <label for="inputHoTen">Lop</label>
                <input type="text" class="form-control" id="inputLop">
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `);

    $('#form').on('submit', async (e) => {
        e.preventDefault();
        const mssv = $('#mssvinput').val();
        const hoten = $('#inputHoTen').val();
        const lop = $('#inputLop').val();
        const password = $('#inputPassword').val();

        try {
            const res = await fetchWithRefresh(`${SERVER}/api/sv/`, {
                method:'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt.get()}`  
                },
                body: JSON.stringify({ mssv, hoTen:hoten, lop })
            });

            const data = await res.json();

            if (res.status === 201) {
                if (data.id) {
                    await fetchWithRefresh(`${SERVER}/api/tk/`, {
                        method:'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt.get()}`  
                        },
                        body: JSON.stringify({ mssv, password })
                    });
                }
                alert("Thêm sinh viên thành công!");
                $('#form')[0].reset();
            } else {
                const data = await res.json();
                alert(data.message);
            }
        } catch(err) {
            console.log(err);
        }
    });
};