/**
 *softDeleteOrder.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated Order. {status, message, data}
 */
const softDeleteOrder = ({
  orderDb,orderItemDb
}) => async (params,req,res) => {
  let {
    query, dataToUpdate,isWarning 
  } = params;
  let updatedOrder = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      orderDb,
      orderItemDb
    });
    return await getDependencyCount(query);
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      orderDb,
      orderItemDb
    });
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteOrder;