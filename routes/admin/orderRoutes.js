const express = require('express');
const router = express.Router();
const orderController = require('../../controller/admin/order');
const { auth, } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

module.exports = router;
