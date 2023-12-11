
/**
 *bulkInsertOrderItem.js
 */

const  orderItemEntity = require('../../entities/orderItem');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created OrderItems. {status, message, data}
 */

const bulkInsertOrderItem = ({ orderItemDb }) => async (dataToCreate,req,res) => {
  let orderitemEntities = dataToCreate.map(item => orderItemEntity(item));
  let createdOrderItem = await orderItemDb.create(orderitemEntities);
  return response.success({ data:{ count:createdOrderItem.length || 0 } });
};
module.exports = bulkInsertOrderItem;