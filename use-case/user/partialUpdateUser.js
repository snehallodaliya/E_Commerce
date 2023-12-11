/**
 *partialUpdateUser.js
 */

const response = require('../../utils/response');
const makeCheckUniqueFieldsInDatabase = require('../../utils/checkUniqueFieldsInDatabase');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated User. {status, message, data}
 */
const partialUpdateUser = ({ userDb }) => async (params,req,res) => {
            
  let checkUniqueFieldsInDatabase = makeCheckUniqueFieldsInDatabase(userDb);
  let checkUniqueFields = await checkUniqueFieldsInDatabase([ 'username', 'email' ],params.dataToUpdate,'UPDATE',params.query);
  if (checkUniqueFields.isDuplicate){
    return response.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
  }

  const user = await userDb.updateOne(params.query,params.dataToUpdate);
  if (!user){
    return response.recordNotFound();
  }
  return response.success({ data:user });
};
module.exports = partialUpdateUser;