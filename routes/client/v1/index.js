const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./cartItemRoutes'));
router.use(require('./cartRoutes'));
router.use(require('./productRoutes'));
router.use(require('./orderItemRoutes'));
router.use(require('./orderRoutes'));
router.use(require('./customerRoutes'));
router.use(require('./userRoutes'));

module.exports = router;
