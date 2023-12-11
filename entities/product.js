module.exports = (product) => {

  let newProduct = { 
    name: product.name,
    description: product.description,
    price: product.price,
    inventoryCount: product.inventoryCount,
    productType: product.productType,
    isDeleted: product.isDeleted,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    addedBy: product.addedBy,
    updatedBy: product.updatedBy,
  };

  // remove undefined values
  Object.keys(newProduct).forEach(key => newProduct[key] === undefined && delete newProduct[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newProduct) => {
   *   if (!newProduct.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newProduct) 
   */

  return Object.freeze(newProduct);
};
