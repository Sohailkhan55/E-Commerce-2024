import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
import braintree from 'braintree';

const router = express.Router();

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

//get products
router.get('/get-product',getProductController);

//single product
router.get('/get-product/:slug',getSingleProductController);

//get photo
router.get('/product-photo/:pid',productPhotoController);//product id

//delete product
router.delete('/delete-product/:pid',deleteProductController);

//update
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

//filter product
router.post('/product-filters',productFiltersController);   //post bcoz we'll be passing valueand we can't pass it in get method

//product count
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController);

//search product
router.get('/search/:keyword',searchProductController);

//similar product
router.get('/related-product/:pid/:cid',relatedProductController);

//category wise product
router.get('/product-category/:slug',productCategoryController);

//payments route
//token  -- for account to verify to proceed for transaction
router.get('/braintree/token',braintreeTokenController);

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController);



export default router;