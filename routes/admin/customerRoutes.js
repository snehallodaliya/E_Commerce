const express = require('express');
const router = express.Router();
const customerController = require('../../controller/admin/customer');
const { auth, } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

module.exports = router;
