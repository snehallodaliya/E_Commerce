/**
 *softDeleteCustomer.js
 */

const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated Customer. {status, message, data}
 */
const softDeleteCustomer = ({ customerDb }) => async (params,req,res) => {
  let updatedCustomer = await customerDb.updateOne(params.query, params.dataToUpdate);
  if (!updatedCustomer){
    return response.recordNotFound();   
  }
  return response.success({ data:updatedCustomer });
};
module.exports = softDeleteCustomer;