module.exports = (req, res, next) => {
    if (req.user && req.user.hak_akses == 'super_user') {
        return next();
    }
    res.json('Tidak ada Akses');
}