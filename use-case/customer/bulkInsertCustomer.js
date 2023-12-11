
/**
 *bulkInsertCustomer.js
 */

const  customerEntity = require('../../entities/customer');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Customers. {status, message, data}
 */

const bulkInsertCustomer = ({ customerDb }) => async (dataToCreate,req,res) => {
  let customerEntities = dataToCreate.map(item => customerEntity(item));
  let createdCustomer = await customerDb.create(customerEntities);
  return response.success({ data:{ count:createdCustomer.length || 0 } });
};
module.exports = bulkInsertCustomer;