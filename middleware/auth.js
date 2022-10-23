module.exports.auth = (req, res, next) => {
    const isAdmin = req.session.isAdmin
  
    if(!isAdmin){
      return res.redirect('/auth/login')
    }

    const admin = req.session.admin
    res.locals.admin = admin
  
    next()
}