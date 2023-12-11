/**
 *softDeleteCartItem.js
 */

const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated CartItem. {status, message, data}
 */
const softDeleteCartItem = ({ cartItemDb }) => async (params,req,res) => {
  let updatedCartItem = await cartItemDb.updateOne(params.query, params.dataToUpdate);
  if (!updatedCartItem){
    return response.recordNotFound();   
  }
  return response.success({ data:updatedCartItem });
};
module.exports = softDeleteCartItem;