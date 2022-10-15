const Auth = require('../model/user')
const { Router } = require('express')
const router = Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

router.get('/login', async (req,res)=>{
    // const user = await User()
    res.render('login',{
        title: 'Login'
    })
})

router.get('/register', async (req,res)=>{
    // const user = await User()
    res.render('register',{
        title: 'Register'
    })
})

router.post('/login', async (req,res)=>{
    const {phone, password} = req.body

    const user = await User.findOne({phone})

    if(!user){
      return res.send('Phone number not found')
    }

    const compare = await bcrypt.compare(password, user.password)

    if(!compare){
        return res.send('Password is not true')
    }

    res.redirect('/')
})

router.post('/register', async(req, res)=>{
    const {name, phone, image, password} = req.body

    const hash = await bcrypt.hash(password, 10)

    const user = new Auth({name, phone, image, password: hash})

    await user.save()

    res.redirect('/auth/login')
})

module.exports = router



