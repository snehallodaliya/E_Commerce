const orderItemDb = require('../../../data-access/orderItemDb');

const orderItemSchema = require('../../../validation/schema/orderItem');

const createValidation = require('../../../validation')(orderItemSchema.createSchema);
const updateValidation = require('../../../validation')(orderItemSchema.updateSchema);
const filterValidation = require('../../../validation')(orderItemSchema.filterValidationSchema);

const orderItemController = require('./orderItem');

module.exports = {};