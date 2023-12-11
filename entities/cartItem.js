module.exports = (cartItem) => {

  let newCartItem = { 
    productId: cartItem.productId,
    cartId: cartItem.cartId,
    quantity: cartItem.quantity,
    isDeleted: cartItem.isDeleted,
    isActive: cartItem.isActive,
    createdAt: cartItem.createdAt,
    updatedAt: cartItem.updatedAt,
    addedBy: cartItem.addedBy,
    updatedBy: cartItem.updatedBy,
  };

  // remove undefined values
  Object.keys(newCartItem).forEach(key => newCartItem[key] === undefined && delete newCartItem[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newCartItem) => {
   *   if (!newCartItem.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newCartItem) 
   */

  return Object.freeze(newCartItem);
};
