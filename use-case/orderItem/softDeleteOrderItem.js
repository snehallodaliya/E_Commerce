/**
 *softDeleteOrderItem.js
 */

const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated OrderItem. {status, message, data}
 */
const softDeleteOrderItem = ({ orderItemDb }) => async (params,req,res) => {
  let updatedOrderItem = await orderItemDb.updateOne(params.query, params.dataToUpdate);
  if (!updatedOrderItem){
    return response.recordNotFound();   
  }
  return response.success({ data:updatedOrderItem });
};
module.exports = softDeleteOrderItem;