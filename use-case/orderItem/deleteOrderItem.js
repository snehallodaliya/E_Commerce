
/**
 *deleteOrderItem.js
 */
 
const response = require('../../utils/response');
/**
 * @description : delete record from database.
 * @param {Object} query : query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted OrderItem. {status, message, data}
 */
const deleteOrderItem = ({ orderItemDb }) => async (query,req,res) => {
  let deletedOrderItem = await orderItemDb.deleteOne(query);
  if (!deletedOrderItem){
    return response.recordNotFound({});
  }
  return response.success({ data: deletedOrderItem });
};

module.exports = deleteOrderItem;