
/**
 *deleteCartItem.js
 */
 
const response = require('../../utils/response');
/**
 * @description : delete record from database.
 * @param {Object} query : query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted CartItem. {status, message, data}
 */
const deleteCartItem = ({ cartItemDb }) => async (query,req,res) => {
  let deletedCartItem = await cartItemDb.deleteOne(query);
  if (!deletedCartItem){
    return response.recordNotFound({});
  }
  return response.success({ data: deletedCartItem });
};

module.exports = deleteCartItem;