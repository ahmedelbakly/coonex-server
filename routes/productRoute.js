import { Router } from "express";
import {
  createAdForRent,
  createAdForSale,
  getProducts,
  searchRent,
  searchSale,
  
} from "../controller/productController.js";
const router = Router();
import {uploadMulti } from "../multer.js";

// define the home page route

router.post(
  "/adSale",
  uploadMulti,
  createAdForSale
);
router.post(
  "/adRent",
  uploadMulti,
  createAdForRent
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
