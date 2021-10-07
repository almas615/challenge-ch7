# GOAL
* login (pakai jwt) : sudah 
* register: sudah
* crud user MVC : sudah
* batasan akses untuk userplayer dan superuser : belum
* logout : belum
* api creat room : belum
* api figh : belum

# ALUR LOGIN
*   user memasukkan username password
*   jika berhasil sistem mengecek hak akses user yang login 
*   jika hak akses user adalah superuser maka akan di redirect ke dashboard
*   jika hak akses user adlah user plauer maka akan di redirect ke game suit

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

 ## GAME
 * `GET '/games'` untuk mengakses halaman game

