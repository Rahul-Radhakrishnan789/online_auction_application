const express = require('express');

const router = express.Router();

const tryCatch = require('../middlewares/tryCatch')

const userAuth = require('../middlewares/userAuth')

const {
    userRegister,
    userLogin,
    placeBid,
    addForAuction
} = require('../controllers/userController')


router.post('/api/users/register',tryCatch(userRegister))

router.post('/api/users/login',tryCatch(userLogin))

router.post('/api/users/placebid/:userId/:itemId',userAuth,tryCatch(placeBid))

router.post('/api/users/addforauction/:userId',userAuth,tryCatch(addForAuction))    


module.exports = router