"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Users_1 = require("./Users");
var Auth_1 = require("./Auth");
var App_1 = require("./App");
var Alerts_1 = require("./Alerts");
// Init router and path
var router = express_1.Router();
// Add sub-routes
router.use('/users', Users_1["default"]);
router.use('/auth', Auth_1["default"]);
router.use('/alerts', Alerts_1["default"]);
router.use('/', App_1["default"]);
// Export the base-router
exports["default"] = router;
