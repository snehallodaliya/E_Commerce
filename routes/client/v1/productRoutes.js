const express = require('express');
const router = express.Router();
const productController = require('../../../controller/client/v1/product');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

module.exports = router;
