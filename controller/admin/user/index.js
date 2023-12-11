const userDb = require('../../../data-access/userDb');
const cartItemDb = require('../../../data-access/cartItemDb');
const cartDb = require('../../../data-access/cartDb');
const productDb = require('../../../data-access/productDb');
const orderItemDb = require('../../../data-access/orderItemDb');
const orderDb = require('../../../data-access/orderDb');
const customerDb = require('../../../data-access/customerDb');
const userTokensDb = require('../../../data-access/userTokensDb');
const roleDb = require('../../../data-access/roleDb');
const projectRouteDb = require('../../../data-access/projectRouteDb');
const routeRoleDb = require('../../../data-access/routeRoleDb');
const userRoleDb = require('../../../data-access/userRoleDb');

const userSchema = require('../../../validation/schema/user');

const createValidation = require('../../../validation')(userSchema.createSchema);
const updateValidation = require('../../../validation')(userSchema.updateSchema);
const filterValidation = require('../../../validation')(userSchema.filterValidationSchema);
const addUserUsecase = require('../../../use-case/user/addUser')({
  userDb,
  createValidation 
});
const bulkInsertUserUsecase = require('../../../use-case/user/bulkInsertUser')({ userDb });
const findAllUserUsecase = require('../../../use-case/user/findAllUser')({
  userDb,
  filterValidation
});
const getUserCountUsecase = require('../../../use-case/user/getUserCount')({
  userDb,
  filterValidation
});
const getUserUsecase = require('../../../use-case/user/getUser')({
  userDb,
  filterValidation
});
const updateUserUsecase = require('../../../use-case/user/updateUser')({
  userDb,
  updateValidation 
});
const partialUpdateUserUsecase = require('../../../use-case/user/partialUpdateUser')({ userDb });
const bulkUpdateUserUsecase = require('../../../use-case/user/bulkUpdateUser')({ userDb });
const softDeleteUserUsecase = require('../../../use-case/user/softDeleteUser')({
  userDb,
  cartItemDb,
  cartDb,
  productDb,
  orderItemDb,
  orderDb,
  customerDb,
  userTokensDb,
  roleDb,
  projectRouteDb,
  routeRoleDb,
  userRoleDb
});
const softDeleteManyUserUsecase = require('../../../use-case/user/softDeleteManyUser')({
  userDb,
  cartItemDb,
  cartDb,
  productDb,
  orderItemDb,
  orderDb,
  customerDb,
  userTokensDb,
  roleDb,
  projectRouteDb,
  routeRoleDb,
  userRoleDb
});
const deleteUserUsecase = require('../../../use-case/user/deleteUser')({
  userDb,
  cartItemDb,
  cartDb,
  productDb,
  orderItemDb,
  orderDb,
  customerDb,
  userTokensDb,
  roleDb,
  projectRouteDb,
  routeRoleDb,
  userRoleDb
});
const deleteManyUserUsecase = require('../../../use-case/user/deleteManyUser')({
  userDb,
  cartItemDb,
  cartDb,
  productDb,
  orderItemDb,
  orderDb,
  customerDb,
  userTokensDb,
  roleDb,
  projectRouteDb,
  routeRoleDb,
  userRoleDb
});
const changePasswordUsecase = require('../../../use-case/user/changePassword')({ userDb });
const updateProfileUsecase = require('../../../use-case/user/updateProfile')({
  userDb,
  updateValidation
});

const userController = require('./user');

const addUser = userController.addUser(addUserUsecase);
const bulkInsertUser = userController.bulkInsertUser(bulkInsertUserUsecase);
const findAllUser = userController.findAllUser(findAllUserUsecase);
const getUserCount = userController.getUserCount(getUserCountUsecase);
const getUserById = userController.getUser(getUserUsecase);
const updateUser = userController.updateUser(updateUserUsecase);
const partialUpdateUser = userController.partialUpdateUser(partialUpdateUserUsecase);
const bulkUpdateUser = userController.bulkUpdateUser(bulkUpdateUserUsecase);
const softDeleteUser = userController.softDeleteUser(softDeleteUserUsecase);
const softDeleteManyUser = userController.softDeleteManyUser(softDeleteManyUserUsecase);
const deleteUser = userController.deleteUser(deleteUserUsecase);
const deleteManyUser = userController.deleteManyUser(deleteManyUserUsecase);
const changePassword = userController.changePassword(changePasswordUsecase);
const updateProfile = userController.updateProfile(updateProfileUsecase);
const getLoggedInUserInfo = userController.getLoggedInUserInfo(getUserUsecase);

module.exports = {
  addUser,
  bulkInsertUser,
  findAllUser,
  getUserCount,
  getUserById,
  updateUser,
  partialUpdateUser,
  bulkUpdateUser,
  softDeleteUser,
  softDeleteManyUser,
  deleteUser,
  deleteManyUser,
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
};