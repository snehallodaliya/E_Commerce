
/**
 *deleteCustomer.js
 */
 
const response = require('../../utils/response');
/**
 * @description : delete record from database.
 * @param {Object} query : query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Customer. {status, message, data}
 */
const deleteCustomer = ({ customerDb }) => async (query,req,res) => {
  let deletedCustomer = await customerDb.deleteOne(query);
  if (!deletedCustomer){
    return response.recordNotFound({});
  }
  return response.success({ data: deletedCustomer });
};

module.exports = deleteCustomer;