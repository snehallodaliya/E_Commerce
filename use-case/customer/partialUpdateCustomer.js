/**
 *partialUpdateCustomer.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Customer. {status, message, data}
 */
const partialUpdateCustomer = ({ customerDb }) => async (params,req,res) => {
  const customer = await customerDb.updateOne(params.query,params.dataToUpdate);
  if (!customer){
    return response.recordNotFound();
  }
  return response.success({ data:customer });
};
module.exports = partialUpdateCustomer;