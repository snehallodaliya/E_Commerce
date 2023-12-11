module.exports = (orderItem) => {

  let newOrderItem = { 
    orderId: orderItem.orderId,
    productId: orderItem.productId,
    qty: orderItem.qty,
    isActive: orderItem.isActive,
    isDelete: orderItem.isDelete,
    createdAt: orderItem.createdAt,
    updatedAt: orderItem.updatedAt,
    addedBy: orderItem.addedBy,
    updatedBy: orderItem.updatedBy,
    isDeleted: orderItem.isDeleted,
  };

  // remove undefined values
  Object.keys(newOrderItem).forEach(key => newOrderItem[key] === undefined && delete newOrderItem[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newOrderItem) => {
   *   if (!newOrderItem.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newOrderItem) 
   */

  return Object.freeze(newOrderItem);
};
