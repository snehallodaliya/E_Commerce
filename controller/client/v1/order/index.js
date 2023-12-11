const orderDb = require('../../../../data-access/orderDb');
const orderItemDb = require('../../../../data-access/orderItemDb');

const orderSchema = require('../../../../validation/schema/order');

const createValidation = require('../../../../validation')(orderSchema.createSchema);
const updateValidation = require('../../../../validation')(orderSchema.updateSchema);
const filterValidation = require('../../../../validation')(orderSchema.filterValidationSchema);
const addOrderUsecase = require('../../../../use-case/order/addOrder')({
  orderDb,
  createValidation 
});
const bulkInsertOrderUsecase = require('../../../../use-case/order/bulkInsertOrder')({ orderDb });
const findAllOrderUsecase = require('../../../../use-case/order/findAllOrder')({
  orderDb,
  filterValidation
});
const getOrderCountUsecase = require('../../../../use-case/order/getOrderCount')({
  orderDb,
  filterValidation
});
const getOrderUsecase = require('../../../../use-case/order/getOrder')({
  orderDb,
  filterValidation
});
const updateOrderUsecase = require('../../../../use-case/order/updateOrder')({
  orderDb,
  updateValidation 
});
const partialUpdateOrderUsecase = require('../../../../use-case/order/partialUpdateOrder')({ orderDb });
const bulkUpdateOrderUsecase = require('../../../../use-case/order/bulkUpdateOrder')({ orderDb });
const softDeleteOrderUsecase = require('../../../../use-case/order/softDeleteOrder')({
  orderDb,
  orderItemDb
});
const softDeleteManyOrderUsecase = require('../../../../use-case/order/softDeleteManyOrder')({
  orderDb,
  orderItemDb
});
const deleteOrderUsecase = require('../../../../use-case/order/deleteOrder')({
  orderDb,
  orderItemDb
});
const deleteManyOrderUsecase = require('../../../../use-case/order/deleteManyOrder')({
  orderDb,
  orderItemDb
});

const orderController = require('./order');

const addOrder = orderController.addOrder(addOrderUsecase);
const bulkInsertOrder = orderController.bulkInsertOrder(bulkInsertOrderUsecase);
const findAllOrder = orderController.findAllOrder(findAllOrderUsecase);
const getOrderCount = orderController.getOrderCount(getOrderCountUsecase);
const getOrderById = orderController.getOrder(getOrderUsecase);
const updateOrder = orderController.updateOrder(updateOrderUsecase);
const partialUpdateOrder = orderController.partialUpdateOrder(partialUpdateOrderUsecase);
const bulkUpdateOrder = orderController.bulkUpdateOrder(bulkUpdateOrderUsecase);
const softDeleteOrder = orderController.softDeleteOrder(softDeleteOrderUsecase);
const softDeleteManyOrder = orderController.softDeleteManyOrder(softDeleteManyOrderUsecase);
const deleteOrder = orderController.deleteOrder(deleteOrderUsecase);
const deleteManyOrder = orderController.deleteManyOrder(deleteManyOrderUsecase);

module.exports = {
  addOrder,
  bulkInsertOrder,
  findAllOrder,
  getOrderCount,
  getOrderById,
  updateOrder,
  partialUpdateOrder,
  bulkUpdateOrder,
  softDeleteOrder,
  softDeleteManyOrder,
  deleteOrder,
  deleteManyOrder,
};