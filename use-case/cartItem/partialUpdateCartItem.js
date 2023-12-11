/**
 *partialUpdateCartItem.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated CartItem. {status, message, data}
 */
const partialUpdateCartItem = ({ cartItemDb }) => async (params,req,res) => {
  const cartitem = await cartItemDb.updateOne(params.query,params.dataToUpdate);
  if (!cartitem){
    return response.recordNotFound();
  }
  return response.success({ data:cartitem });
};
module.exports = partialUpdateCartItem;