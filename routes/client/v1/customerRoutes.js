const express = require('express');
const router = express.Router();
const customerController = require('../../../controller/client/v1/customer');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/customer/create').post(auth(PLATFORM.CLIENT),checkRolePermission,customerController.addCustomer);
router.route('/client/api/v1/customer/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,customerController.bulkInsertCustomer);
router.route('/client/api/v1/customer/list').post(auth(PLATFORM.CLIENT),checkRolePermission,customerController.findAllCustomer);
router.route('/client/api/v1/customer/count').post(auth(PLATFORM.CLIENT),checkRolePermission,customerController.getCustomerCount);
router.route('/client/api/v1/customer/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,customerController.getCustomerById);
router.route('/client/api/v1/customer/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,customerController.updateCustomer);   
router.route('/client/api/v1/customer/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,customerController.partialUpdateCustomer);   
router.route('/client/api/v1/customer/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,customerController.bulkUpdateCustomer); 
router.route('/client/api/v1/customer/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,customerController.softDeleteCustomer);
router.route('/client/api/v1/customer/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,customerController.softDeleteManyCustomer);
router.route('/client/api/v1/customer/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,customerController.deleteCustomer);
router.route('/client/api/v1/customer/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,customerController.deleteManyCustomer);

module.exports = router;
