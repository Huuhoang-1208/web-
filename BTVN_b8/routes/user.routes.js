const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");


router.get(
    "/dashboard",
    userController.getDashboard
);


router.get(
    "/dashboard/edit",
    userController.getEditProfile
);


router.post(
    "/dashboard/edit",
    userController.updateProfile
);


module.exports = router;