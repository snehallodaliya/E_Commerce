const productDb = require('../../../../data-access/productDb');
const cartItemDb = require('../../../../data-access/cartItemDb');
const orderItemDb = require('../../../../data-access/orderItemDb');

const productSchema = require('../../../../validation/schema/product');

const createValidation = require('../../../../validation')(productSchema.createSchema);
const updateValidation = require('../../../../validation')(productSchema.updateSchema);
const filterValidation = require('../../../../validation')(productSchema.filterValidationSchema);

const productController = require('./product');

module.exports = {};