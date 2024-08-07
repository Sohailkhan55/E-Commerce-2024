import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getUserController,
  deleteUserController,
  promoteUserController,
  demoteUserController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post('/forgot-password',forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);
//middlewares will run from left to right and if before one passed,then only it'll move to next middleware

//protected User route auth
router.get('/user-auth',requireSignIn,(req,res) => {
  res.status(200).send({ok:true});
})

//protected Admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res) => {  //2 conditions are checked,token and admin
  res.status(200).send({ok:true});
})

//update profile
router.put('/profile',requireSignIn,updateProfileController);

//orders
router.get('/orders',requireSignIn,getOrdersController);

//all orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController);

// order status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController);

// get all users
router.get('/all-users',requireSignIn,isAdmin,getUserController);

//delete user
router.delete('/delete-user/:id',requireSignIn,isAdmin,deleteUserController);

//promote user to admin
router.put('/promote-user/:id',requireSignIn,isAdmin,promoteUserController);

//demote admin to user
router.put('/demote-user/:id',requireSignIn,isAdmin,demoteUserController);

export default router;
