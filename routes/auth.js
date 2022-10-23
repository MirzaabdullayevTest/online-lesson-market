const { Router } = require('express')
const router = Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

router.get('/login', async (req, res)=>{
    res.render('login',{
        title: 'Login',
        layout: 'layout',
        error: req.flash('error')
    })
})

router.get('/register', async (req, res) => {
    res.render('register', {
        title: 'Register',
        layout: 'layout'
    })
})

router.post('/login', async (req, res) => {
    const {phone, password} = req.body

    req.session.isAdmin = false

    const user = await User.findOne({phone})

    if(!user){
        req.flash('error', 'tupoy nomer xato boshqattan ko`r. yoki reg qil')
        return  res.redirect('/auth/login')
    }

    const compare = await bcrypt.compare(password, user.password)

    if(!compare){
        req.flash('error', 'tupoy parol xato boshqattan ko`r. yoki reg qil')
        return  res.redirect('/auth/login')
    }

    req.session.isAdmin = true
    req.session.admin = user

    res.redirect('/')
})

router.post('/register', async(req, res)=>{
    const {name, phone, image, password} = req.body

    const hasPhone = await User.findOne({phone})

    if(hasPhone){
       return res.send('This phone number is busy')
    }

    const hash = await bcrypt.hash(password, 10) // as4d5as4d5a4sd5a4sd5as4d5

    const user = new User({name, phone, image, password: hash})

    await user.save()

    res.redirect('/auth/login')
})

router.get('/logout', (req,res)=>{
    req.session.isAdmin = false
    res.redirect('/auth/login')
})

module.exports = router



