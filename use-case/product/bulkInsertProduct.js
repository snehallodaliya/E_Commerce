
/**
 *bulkInsertProduct.js
 */

const  productEntity = require('../../entities/product');
const response = require('../../utils/response');
const makeCheckUniqueFieldsInDatabase = require('../../utils/checkUniqueFieldsInDatabase');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Products. {status, message, data}
 */

const bulkInsertProduct = ({ productDb }) => async (dataToCreate,req,res) => {
  let productEntities = dataToCreate.map(item => productEntity(item));
            
  let checkUniqueFieldsInDatabase = makeCheckUniqueFieldsInDatabase(productDb);
  let checkUniqueFields = await checkUniqueFieldsInDatabase([ 'name' ],productEntities,'BULK_INSERT');
  if (checkUniqueFields.isDuplicate){
    return response.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
  }

  let createdProduct = await productDb.create(productEntities);
  return response.success({ data:{ count:createdProduct.length || 0 } });
};
module.exports = bulkInsertProduct;