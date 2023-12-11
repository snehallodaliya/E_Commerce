/**
 *updateCustomer.js
 */

const  customerEntity = require('../../entities/customer');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated Customer. {status, message, data}
 */
const updateCustomer = ({
  customerDb, updateValidation
}) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let customer = customerEntity(dataToUpdate);
  customer = await customerDb.updateOne(query,customer);
  if (!customer){
    return response.recordNotFound();
  }
  return response.success({ data:customer });
};
module.exports = updateCustomer;