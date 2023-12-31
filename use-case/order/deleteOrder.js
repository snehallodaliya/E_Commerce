
/**
 *deleteOrder.js
 */
 
const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
    
/**
 * @description : delete record from database.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Order. {status, message, data}
 */
const deleteOrder = ({
  orderDb,orderItemDb
}) => async (params,req,res) => {
  let {
    query,isWarning 
  } = params;
  let deletedOrder = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      orderDb,
      orderItemDb
    });
    return await getDependencyCount(query);
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      orderDb,
      orderItemDb
    });
    return await deleteWithDependency(query);
  }
};

module.exports = deleteOrder;