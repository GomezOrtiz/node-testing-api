const express = require('express');
const authRoute = require('./auth/auth.route');
const userRoute = require('./auth/user.route');
const docsRoute = require('./docs/docs.route');
const coasterRoute = require('./coaster/coaster.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/coasters', coasterRoute);

module.exports = router;
