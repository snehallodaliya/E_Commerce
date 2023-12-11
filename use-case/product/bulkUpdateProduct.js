/**
 *bulkUpdateProduct.js
 */

const response = require('../../utils/response');
const makeCheckUniqueFieldsInDatabase = require('../../utils/checkUniqueFieldsInDatabase');

/**
 * @description : update multiple records of product with data by filter.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateProduct = ({ productDb }) => async (params,req,res) => {
            
  let checkUniqueFieldsInDatabase = makeCheckUniqueFieldsInDatabase(productDb);
  let checkUniqueFields = await checkUniqueFieldsInDatabase([ 'name' ],params.dataToUpdate,'BULK_UPDATE',params.query);
  if (checkUniqueFields.isDuplicate){
    return response.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
  }

  const updatedProduct = await productDb.updateMany(params.query,params.dataToUpdate);
  return response.success({ data:{ count:updatedProduct } });
};
module.exports = bulkUpdateProduct;