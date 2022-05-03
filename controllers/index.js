const router = require('express').Router();
// create const for controller files and folders
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
// create router with property use to connect routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
  });
  
module.exports = router;