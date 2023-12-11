/**
 *addOrderItem.js
 */

const  orderItemEntity = require('../../entities/orderItem');
const response = require('../../utils/response');
/**
 * @description : create new record of orderItem in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addOrderItem = ({
  orderItemDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let orderItem = orderItemEntity(dataToCreate);
  orderItem = await orderItemDb.create(orderItem);
  return response.success({ data:orderItem });
};
module.exports = addOrderItem;