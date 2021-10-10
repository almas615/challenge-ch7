// api /superUser hanya bisa diakses kalau user adalah super user
module.exports = (req, res, next) => {
  if(req.user && req.user.hak_akses == 'super_user'){
    return next();
  }
  console.log(`Hak akses : ${req.user.hak_akses}`)
  res.json('User is not Super User');
}