module.exports = (customer) => {

  let newCustomer = { 
    firstName: customer.firstName,
    lastName: customer.lastName,
    name: customer.name,
    profile: customer.profile,
    contactNumber: customer.contactNumber,
    email: customer.email,
    isActive: customer.isActive,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
    addedBy: customer.addedBy,
    updatedBy: customer.updatedBy,
    isDeleted: customer.isDeleted,
    userId: customer.userId,
  };

  // remove undefined values
  Object.keys(newCustomer).forEach(key => newCustomer[key] === undefined && delete newCustomer[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newCustomer) => {
   *   if (!newCustomer.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newCustomer) 
   */

  return Object.freeze(newCustomer);
};
