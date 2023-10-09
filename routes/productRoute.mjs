import { Router } from "express";
import {
  createAdForRent,
  createAdForSale,
  getProducts,
  searchRent,
  searchSale,
  
} from "../controller/productController.mjs";
const router = Router();
import {uploadMulti } from "../multer.mjs";

// define the home page route

router.post(
  "/adSale",createAdForSale
   /// uploadMulti,
);
router.post(
  "/adRent",createAdForRent
  ///uploadMulti,
  
);
router.post(
  "/searchSale",
 searchSale
  
);
router.post(
  "/searchRent",
 searchRent
  
);
router.get(
  "/getProduct",
 getProducts
  
);

export default router;
