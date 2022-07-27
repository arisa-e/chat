const router = require('express').Router()

const {auth}= require("../controller/controller")

router.post('auth', auth)
// router.post('login', login)

module.exports = router