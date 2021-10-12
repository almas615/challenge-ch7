# GOAL
* login (pakai jwt) : `sudah` 
* register: `sudah`
* crud user MVC : `sudah`
* api creat room : `sudah`
* api figh : `sudah`
* fungsi hitung hasil pilihan player : `sudah`
* batasan akses route untuk userplayer dan superuser : `sudah`

# JOBDESK
* Merubah dashboard menjadi mvc : `Aka`
* authentifikasi JWT : `Satrio`
* Api create-room dan fight : `Almas`
* Authorisasi hak akses dan template engine : `Rista`


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
 * `GET '/games/create-room'` untuk membuat room
 * `GET '/games/fight/:idRoom'` untuk mengakses pertandingan

