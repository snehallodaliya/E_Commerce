const userDb = require('../../../../data-access/userDb');
const cartItemDb = require('../../../../data-access/cartItemDb');
const cartDb = require('../../../../data-access/cartDb');
const productDb = require('../../../../data-access/productDb');
const orderItemDb = require('../../../../data-access/orderItemDb');
const orderDb = require('../../../../data-access/orderDb');
const customerDb = require('../../../../data-access/customerDb');
const userTokensDb = require('../../../../data-access/userTokensDb');
const roleDb = require('../../../../data-access/roleDb');
const projectRouteDb = require('../../../../data-access/projectRouteDb');
const routeRoleDb = require('../../../../data-access/routeRoleDb');
const userRoleDb = require('../../../../data-access/userRoleDb');

const userSchema = require('../../../../validation/schema/user');

const createValidation = require('../../../../validation')(userSchema.createSchema);
const updateValidation = require('../../../../validation')(userSchema.updateSchema);
const filterValidation = require('../../../../validation')(userSchema.filterValidationSchema);
const changePasswordUsecase = require('../../../../use-case/user/changePassword')({ userDb });
const updateProfileUsecase = require('../../../../use-case/user/updateProfile')({
  userDb,
  updateValidation
});
const getUserUsecase = require('../../../../use-case/user/getUser')({
  userDb,
  filterValidation
});

const userController = require('./user');

const changePassword = userController.changePassword(changePasswordUsecase);
const updateProfile = userController.updateProfile(updateProfileUsecase);
const getLoggedInUserInfo = userController.getLoggedInUserInfo(getUserUsecase);

module.exports = {
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
};