/**
 *partialUpdateProduct.js
 */

const response = require('../../utils/response');
const makeCheckUniqueFieldsInDatabase = require('../../utils/checkUniqueFieldsInDatabase');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Product. {status, message, data}
 */
const partialUpdateProduct = ({ productDb }) => async (params,req,res) => {
            
  let checkUniqueFieldsInDatabase = makeCheckUniqueFieldsInDatabase(productDb);
  let checkUniqueFields = await checkUniqueFieldsInDatabase([ 'name' ],params.dataToUpdate,'UPDATE',params.query);
  if (checkUniqueFields.isDuplicate){
    return response.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
  }

  const product = await productDb.updateOne(params.query,params.dataToUpdate);
  if (!product){
    return response.recordNotFound();
  }
  return response.success({ data:product });
};
module.exports = partialUpdateProduct;