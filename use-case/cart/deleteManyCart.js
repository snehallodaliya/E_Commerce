/**
 *deleteManyCart.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
    
/**
 * @description : delete documents from table by using ids.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyCart = ({
  cartDb,cartItemDb
}) => async (params,req,res) => {
  let {
    query,isWarning 
  } = params;
  let deletedCart;
  if (isWarning){
    const getDependencyCount = makeGetDependencyCount({
      cartDb,
      cartItemDb
    });
    return await getDependencyCount(query);
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      cartDb,
      cartItemDb
    });
    return await deleteWithDependency(query);
  }
};
module.exports = deleteManyCart;