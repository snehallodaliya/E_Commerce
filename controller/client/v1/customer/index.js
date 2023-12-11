const customerDb = require('../../../../data-access/customerDb');

const customerSchema = require('../../../../validation/schema/customer');

const createValidation = require('../../../../validation')(customerSchema.createSchema);
const updateValidation = require('../../../../validation')(customerSchema.updateSchema);
const filterValidation = require('../../../../validation')(customerSchema.filterValidationSchema);
const addCustomerUsecase = require('../../../../use-case/customer/addCustomer')({
  customerDb,
  createValidation 
});
const bulkInsertCustomerUsecase = require('../../../../use-case/customer/bulkInsertCustomer')({ customerDb });
const findAllCustomerUsecase = require('../../../../use-case/customer/findAllCustomer')({
  customerDb,
  filterValidation
});
const getCustomerCountUsecase = require('../../../../use-case/customer/getCustomerCount')({
  customerDb,
  filterValidation
});
const getCustomerUsecase = require('../../../../use-case/customer/getCustomer')({
  customerDb,
  filterValidation
});
const updateCustomerUsecase = require('../../../../use-case/customer/updateCustomer')({
  customerDb,
  updateValidation 
});
const partialUpdateCustomerUsecase = require('../../../../use-case/customer/partialUpdateCustomer')({ customerDb });
const bulkUpdateCustomerUsecase = require('../../../../use-case/customer/bulkUpdateCustomer')({ customerDb });
const softDeleteCustomerUsecase = require('../../../../use-case/customer/softDeleteCustomer')({ customerDb });
const softDeleteManyCustomerUsecase = require('../../../../use-case/customer/softDeleteManyCustomer')({ customerDb });
const deleteCustomerUsecase = require('../../../../use-case/customer/deleteCustomer')({ customerDb });
const deleteManyCustomerUsecase = require('../../../../use-case/customer/deleteManyCustomer')({ customerDb });

const customerController = require('./customer');

const addCustomer = customerController.addCustomer(addCustomerUsecase);
const bulkInsertCustomer = customerController.bulkInsertCustomer(bulkInsertCustomerUsecase);
const findAllCustomer = customerController.findAllCustomer(findAllCustomerUsecase);
const getCustomerCount = customerController.getCustomerCount(getCustomerCountUsecase);
const getCustomerById = customerController.getCustomer(getCustomerUsecase);
const updateCustomer = customerController.updateCustomer(updateCustomerUsecase);
const partialUpdateCustomer = customerController.partialUpdateCustomer(partialUpdateCustomerUsecase);
const bulkUpdateCustomer = customerController.bulkUpdateCustomer(bulkUpdateCustomerUsecase);
const softDeleteCustomer = customerController.softDeleteCustomer(softDeleteCustomerUsecase);
const softDeleteManyCustomer = customerController.softDeleteManyCustomer(softDeleteManyCustomerUsecase);
const deleteCustomer = customerController.deleteCustomer(deleteCustomerUsecase);
const deleteManyCustomer = customerController.deleteManyCustomer(deleteManyCustomerUsecase);

module.exports = {
  addCustomer,
  bulkInsertCustomer,
  findAllCustomer,
  getCustomerCount,
  getCustomerById,
  updateCustomer,
  partialUpdateCustomer,
  bulkUpdateCustomer,
  softDeleteCustomer,
  softDeleteManyCustomer,
  deleteCustomer,
  deleteManyCustomer,
};