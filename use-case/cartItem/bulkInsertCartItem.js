
/**
 *bulkInsertCartItem.js
 */

const  cartItemEntity = require('../../entities/cartItem');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created CartItems. {status, message, data}
 */

const bulkInsertCartItem = ({ cartItemDb }) => async (dataToCreate,req,res) => {
  let cartitemEntities = dataToCreate.map(item => cartItemEntity(item));
  let createdCartItem = await cartItemDb.create(cartitemEntities);
  return response.success({ data:{ count:createdCartItem.length || 0 } });
};
module.exports = bulkInsertCartItem;