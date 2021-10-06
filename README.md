FONT OPEN SANS HARUS ONLINE
 
1 login form digunakan untuk login user biasa dan login super user. jika user yang login memiliki hak akses user maka akan diredirect ke halaman landing page, jika yang login super user maka akan diarahkan ke halaman dashboard

cara penggunaan dashboard:
1. untuk menambah data klik tombol tambah data kemudian isi form
2. untuk mengedit data , klik pada baris data yang ingin diubah kemudian ubah datanya pada form.
3. untuk menghapus data, klik pada baris data yang ingin dihapus kemudian pada form klik tombol hapus

semua crud pada dashboard tidak bisa di akses sebelum  login super user

# DAFTAR API
## HOME
 * `GET '/'` untuk mengakses halaman homepage
## AUTHENTICATION
 * `GET '/auth/login'` untuk mengakses halaman login
 * `POST '/auth/login'` untuk mengakses proses login
 * `GET '/auth/register'` untuk mengakses halaman register
 * `POST '/auth/register'` untuk mengakses proses register
## USERS
 * `GET '/users'` untuk mengakses halaman dasboard User
 * `POST '/users'` untuk mengakses proses tambah User
 * `GET '/users/delete/:id'` untuk mengakses proses hapus user
 * `GET '/users/update/:id'` untuk mengakses proses ubah User

