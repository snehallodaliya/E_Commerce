const response = require('../../utils/response');

const getDependencyCount = ({
  orderDb,orderItemDb
})=> async (filter) =>{
  let order = await orderDb.findMany(filter);
  if (order.length){
    let orderIds = order.map((obj) => obj.id);

    const orderItemFilter = { '$or': [{ orderId : { '$in' : orderIds } }] };
    const orderItemCnt =  await orderItemDb.count(orderItemFilter);
    let result = { orderItem :orderItemCnt , };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  order : 0 }
    });
  }
};

const deleteWithDependency = ({
  orderDb,orderItemDb
})=> async (filter) =>{
  let order = await orderDb.findMany(filter);
  if (order.length){
    let orderIds = order.map((obj) => obj.id);

    const orderItemFilter = { '$or': [{ orderId : { '$in' : orderIds } }] };
    const orderItemCnt =  (await orderItemDb.deleteMany(orderItemFilter));
    let deleted = (await orderDb.deleteMany(filter));
    let result = { orderItem :orderItemCnt , };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  order : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  orderDb,orderItemDb
}) => async (filter,updateBody) =>{
  let order = await orderDb.findMany(filter);
  if (order.length){
    let orderIds = order.map((obj) => obj.id);

    const orderItemFilter = { '$or': [{ orderId : { '$in' : orderIds } }] };
    const orderItemCnt =  (await orderItemDb.updateMany(orderItemFilter,updateBody));
    let updated = (await orderDb.updateMany(filter,updateBody));
    let result = { orderItem :orderItemCnt , };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  order : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
