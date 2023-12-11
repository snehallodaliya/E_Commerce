/**
 *partialUpdateOrderItem.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated OrderItem. {status, message, data}
 */
const partialUpdateOrderItem = ({ orderItemDb }) => async (params,req,res) => {
  const orderitem = await orderItemDb.updateOne(params.query,params.dataToUpdate);
  if (!orderitem){
    return response.recordNotFound();
  }
  return response.success({ data:orderitem });
};
module.exports = partialUpdateOrderItem;