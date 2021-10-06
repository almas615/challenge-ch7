# GOAL
* login (pakai jwt) : sudah 
* register: sudah
* crud user MVC : sudah
* batasan akses untuk userplayer dan superuser : belum
* logout : belum
* api creat room : belum
* api figh : belum

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

 ## GAME UPDATE
 * `GET '/games'` untuk mengakses halaman game

