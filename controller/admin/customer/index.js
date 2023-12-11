const customerDb = require('../../../data-access/customerDb');

const customerSchema = require('../../../validation/schema/customer');

const createValidation = require('../../../validation')(customerSchema.createSchema);
const updateValidation = require('../../../validation')(customerSchema.updateSchema);
const filterValidation = require('../../../validation')(customerSchema.filterValidationSchema);

const customerController = require('./customer');

module.exports = {};