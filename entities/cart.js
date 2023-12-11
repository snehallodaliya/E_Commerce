module.exports = (cart) => {

  let newCart = { 
    userId: cart.userId,
    products: cart.products,
    isDeleted: cart.isDeleted,
    isActive: cart.isActive,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
    addedBy: cart.addedBy,
    updatedBy: cart.updatedBy,
  };

  // remove undefined values
  Object.keys(newCart).forEach(key => newCart[key] === undefined && delete newCart[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newCart) => {
   *   if (!newCart.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newCart) 
   */

  return Object.freeze(newCart);
};
