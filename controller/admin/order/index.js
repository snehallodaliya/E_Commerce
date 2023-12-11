const orderDb = require('../../../data-access/orderDb');
const orderItemDb = require('../../../data-access/orderItemDb');

const orderSchema = require('../../../validation/schema/order');

const createValidation = require('../../../validation')(orderSchema.createSchema);
const updateValidation = require('../../../validation')(orderSchema.updateSchema);
const filterValidation = require('../../../validation')(orderSchema.filterValidationSchema);

const orderController = require('./order');

module.exports = {};