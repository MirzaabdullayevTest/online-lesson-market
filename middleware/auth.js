module.exports.auth = (req, res, next) => {
    const admin = req.session.isAdmin
  
    if(!admin){
      res.redirect('/auth/login')
    }
  
    next()
}