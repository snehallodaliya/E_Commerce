const response = require('../../utils/response');

const getDependencyCount = ({
  productDb,cartItemDb,orderItemDb
})=> async (filter) =>{
  let product = await productDb.findMany(filter);
  if (product.length){
    let productIds = product.map((obj) => obj.id);

    const cartItemFilter = { '$or': [{ productId : { '$in' : productIds } }] };
    const cartItemCnt =  await cartItemDb.count(cartItemFilter);

    const orderItemFilter = { '$or': [{ productId : { '$in' : productIds } }] };
    const orderItemCnt =  await orderItemDb.count(orderItemFilter);
    let result = {
      cartItem :cartItemCnt ,
      orderItem :orderItemCnt ,
    };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  product : 0 }
    });
  }
};

const deleteWithDependency = ({
  productDb,cartItemDb,orderItemDb
})=> async (filter) =>{
  let product = await productDb.findMany(filter);
  if (product.length){
    let productIds = product.map((obj) => obj.id);

    const cartItemFilter = { '$or': [{ productId : { '$in' : productIds } }] };
    const cartItemCnt =  (await cartItemDb.deleteMany(cartItemFilter));

    const orderItemFilter = { '$or': [{ productId : { '$in' : productIds } }] };
    const orderItemCnt =  (await orderItemDb.deleteMany(orderItemFilter));
    let deleted = (await productDb.deleteMany(filter));
    let result = {
      cartItem :cartItemCnt ,
      orderItem :orderItemCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  product : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  productDb,cartItemDb,orderItemDb
}) => async (filter,updateBody) =>{
  let product = await productDb.findMany(filter);
  if (product.length){
    let productIds = product.map((obj) => obj.id);

    const cartItemFilter = { '$or': [{ productId : { '$in' : productIds } }] };
    const cartItemCnt =  (await cartItemDb.updateMany(cartItemFilter,updateBody));

    const orderItemFilter = { '$or': [{ productId : { '$in' : productIds } }] };
    const orderItemCnt =  (await orderItemDb.updateMany(orderItemFilter,updateBody));
    let updated = (await productDb.updateMany(filter,updateBody));
    let result = {
      cartItem :cartItemCnt ,
      orderItem :orderItemCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  product : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
