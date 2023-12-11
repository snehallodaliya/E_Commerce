const orderItemDb = require('../../../../data-access/orderItemDb');

const orderItemSchema = require('../../../../validation/schema/orderItem');

const createValidation = require('../../../../validation')(orderItemSchema.createSchema);
const updateValidation = require('../../../../validation')(orderItemSchema.updateSchema);
const filterValidation = require('../../../../validation')(orderItemSchema.filterValidationSchema);
const addOrderItemUsecase = require('../../../../use-case/orderItem/addOrderItem')({
  orderItemDb,
  createValidation 
});
const bulkInsertOrderItemUsecase = require('../../../../use-case/orderItem/bulkInsertOrderItem')({ orderItemDb });
const findAllOrderItemUsecase = require('../../../../use-case/orderItem/findAllOrderItem')({
  orderItemDb,
  filterValidation
});
const getOrderItemCountUsecase = require('../../../../use-case/orderItem/getOrderItemCount')({
  orderItemDb,
  filterValidation
});
const getOrderItemUsecase = require('../../../../use-case/orderItem/getOrderItem')({
  orderItemDb,
  filterValidation
});
const updateOrderItemUsecase = require('../../../../use-case/orderItem/updateOrderItem')({
  orderItemDb,
  updateValidation 
});
const partialUpdateOrderItemUsecase = require('../../../../use-case/orderItem/partialUpdateOrderItem')({ orderItemDb });
const bulkUpdateOrderItemUsecase = require('../../../../use-case/orderItem/bulkUpdateOrderItem')({ orderItemDb });
const softDeleteOrderItemUsecase = require('../../../../use-case/orderItem/softDeleteOrderItem')({ orderItemDb });
const softDeleteManyOrderItemUsecase = require('../../../../use-case/orderItem/softDeleteManyOrderItem')({ orderItemDb });
const deleteOrderItemUsecase = require('../../../../use-case/orderItem/deleteOrderItem')({ orderItemDb });
const deleteManyOrderItemUsecase = require('../../../../use-case/orderItem/deleteManyOrderItem')({ orderItemDb });

const orderItemController = require('./orderItem');

const addOrderItem = orderItemController.addOrderItem(addOrderItemUsecase);
const bulkInsertOrderItem = orderItemController.bulkInsertOrderItem(bulkInsertOrderItemUsecase);
const findAllOrderItem = orderItemController.findAllOrderItem(findAllOrderItemUsecase);
const getOrderItemCount = orderItemController.getOrderItemCount(getOrderItemCountUsecase);
const getOrderItemById = orderItemController.getOrderItem(getOrderItemUsecase);
const updateOrderItem = orderItemController.updateOrderItem(updateOrderItemUsecase);
const partialUpdateOrderItem = orderItemController.partialUpdateOrderItem(partialUpdateOrderItemUsecase);
const bulkUpdateOrderItem = orderItemController.bulkUpdateOrderItem(bulkUpdateOrderItemUsecase);
const softDeleteOrderItem = orderItemController.softDeleteOrderItem(softDeleteOrderItemUsecase);
const softDeleteManyOrderItem = orderItemController.softDeleteManyOrderItem(softDeleteManyOrderItemUsecase);
const deleteOrderItem = orderItemController.deleteOrderItem(deleteOrderItemUsecase);
const deleteManyOrderItem = orderItemController.deleteManyOrderItem(deleteManyOrderItemUsecase);

module.exports = {
  addOrderItem,
  bulkInsertOrderItem,
  findAllOrderItem,
  getOrderItemCount,
  getOrderItemById,
  updateOrderItem,
  partialUpdateOrderItem,
  bulkUpdateOrderItem,
  softDeleteOrderItem,
  softDeleteManyOrderItem,
  deleteOrderItem,
  deleteManyOrderItem,
};