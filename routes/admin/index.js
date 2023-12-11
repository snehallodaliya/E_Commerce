const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./cartItemRoutes'));
router.use(require('./cartRoutes'));
router.use(require('./productRoutes'));
router.use(require('./orderItemRoutes'));
router.use(require('./orderRoutes'));
router.use(require('./customerRoutes'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
