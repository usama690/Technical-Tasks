const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const projectRoute = require('./project')



router.get('/', (req, res) => {
    res.render('chat', { title: 'chat' })
})

router.get('/about', (req, res) => {
    res.render('about', { title: 'about' })
})

router.use('/user', userRoute)
router.use('/project', projectRoute)

module.exports = router 