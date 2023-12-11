/**
 *addCustomer.js
 */

const  customerEntity = require('../../entities/customer');
const response = require('../../utils/response');
/**
 * @description : create new record of customer in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addCustomer = ({
  customerDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let customer = customerEntity(dataToCreate);
  customer = await customerDb.create(customer);
  return response.success({ data:customer });
};
module.exports = addCustomer;