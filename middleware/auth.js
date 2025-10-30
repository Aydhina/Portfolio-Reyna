module.exports = function (req, res, next) {
  if (!req.session || !req.session.isLogin) {
    return res.redirect('/login');
  }
  next();
};
