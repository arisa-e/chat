const { signup, login, setAvatar, getAllUsers, logout }= require("../controller/controller")

const router = require('express').Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/setAvatar/:id', setAvatar)
router.get('/allUsers/:id', getAllUsers)
router.get('/logout/:id', logout)

module.exports = router