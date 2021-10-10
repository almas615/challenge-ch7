// api /superUser hanya bisa diakses kalau user adalah super user
module.exports = (req, res, next) => {
    if (req.user && req.user.hak_akses == 'super_user') {
        return next();
    }

    res.json("hasus super user")
}