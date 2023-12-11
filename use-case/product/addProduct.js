/**
 *addProduct.js
 */

const  productEntity = require('../../entities/product');
const response = require('../../utils/response');
const makeCheckUniqueFieldsInDatabase = require('../../utils/checkUniqueFieldsInDatabase');
/**
 * @description : create new record of product in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addProduct = ({
  productDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let product = productEntity(dataToCreate);
  let checkUniqueFieldsInDatabase = makeCheckUniqueFieldsInDatabase(productDb);
  let checkUniqueFields = await checkUniqueFieldsInDatabase([ 'name' ],product,'INSERT');
  if (checkUniqueFields.isDuplicate){
    return response.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
  }

  product = await productDb.create(product);
  return response.success({ data:product });
};
module.exports = addProduct;