const cartItemDb = require('../../../../data-access/cartItemDb');

const cartItemSchema = require('../../../../validation/schema/cartItem');

const createValidation = require('../../../../validation')(cartItemSchema.createSchema);
const updateValidation = require('../../../../validation')(cartItemSchema.updateSchema);
const filterValidation = require('../../../../validation')(cartItemSchema.filterValidationSchema);
const addCartItemUsecase = require('../../../../use-case/cartItem/addCartItem')({
  cartItemDb,
  createValidation 
});
const bulkInsertCartItemUsecase = require('../../../../use-case/cartItem/bulkInsertCartItem')({ cartItemDb });
const findAllCartItemUsecase = require('../../../../use-case/cartItem/findAllCartItem')({
  cartItemDb,
  filterValidation
});
const getCartItemCountUsecase = require('../../../../use-case/cartItem/getCartItemCount')({
  cartItemDb,
  filterValidation
});
const getCartItemUsecase = require('../../../../use-case/cartItem/getCartItem')({
  cartItemDb,
  filterValidation
});
const updateCartItemUsecase = require('../../../../use-case/cartItem/updateCartItem')({
  cartItemDb,
  updateValidation 
});
const partialUpdateCartItemUsecase = require('../../../../use-case/cartItem/partialUpdateCartItem')({ cartItemDb });
const bulkUpdateCartItemUsecase = require('../../../../use-case/cartItem/bulkUpdateCartItem')({ cartItemDb });
const softDeleteCartItemUsecase = require('../../../../use-case/cartItem/softDeleteCartItem')({ cartItemDb });
const softDeleteManyCartItemUsecase = require('../../../../use-case/cartItem/softDeleteManyCartItem')({ cartItemDb });
const deleteCartItemUsecase = require('../../../../use-case/cartItem/deleteCartItem')({ cartItemDb });
const deleteManyCartItemUsecase = require('../../../../use-case/cartItem/deleteManyCartItem')({ cartItemDb });

const cartItemController = require('./cartItem');

const addCartItem = cartItemController.addCartItem(addCartItemUsecase);
const bulkInsertCartItem = cartItemController.bulkInsertCartItem(bulkInsertCartItemUsecase);
const findAllCartItem = cartItemController.findAllCartItem(findAllCartItemUsecase);
const getCartItemCount = cartItemController.getCartItemCount(getCartItemCountUsecase);
const getCartItemById = cartItemController.getCartItem(getCartItemUsecase);
const updateCartItem = cartItemController.updateCartItem(updateCartItemUsecase);
const partialUpdateCartItem = cartItemController.partialUpdateCartItem(partialUpdateCartItemUsecase);
const bulkUpdateCartItem = cartItemController.bulkUpdateCartItem(bulkUpdateCartItemUsecase);
const softDeleteCartItem = cartItemController.softDeleteCartItem(softDeleteCartItemUsecase);
const softDeleteManyCartItem = cartItemController.softDeleteManyCartItem(softDeleteManyCartItemUsecase);
const deleteCartItem = cartItemController.deleteCartItem(deleteCartItemUsecase);
const deleteManyCartItem = cartItemController.deleteManyCartItem(deleteManyCartItemUsecase);

module.exports = {
  addCartItem,
  bulkInsertCartItem,
  findAllCartItem,
  getCartItemCount,
  getCartItemById,
  updateCartItem,
  partialUpdateCartItem,
  bulkUpdateCartItem,
  softDeleteCartItem,
  softDeleteManyCartItem,
  deleteCartItem,
  deleteManyCartItem,
};