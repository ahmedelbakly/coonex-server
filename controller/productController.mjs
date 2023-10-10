// product-controller


import { AdForRent, AdForSale } from "../models/productModel.mjs";

export const createAdForSale = async (req, res, next) => {
  
  
  
  let productImg = [];
  const {
    userId,
    title,
    videoLink,
    propertyType,
    category,
    description,
    city,
    price,
    rooms,
    surfaceArea,
    paths,
    floor,
    buildingAge,
    listerType,
    paymentMethod,
    furnished,
    mortgaged,
  } = req.body;

  try {
    if (
      title &&
      userId &&
      videoLink &&
      propertyType &&
      category &&
      description &&
      city &&
      price &&
      rooms &&
      surfaceArea &&
      paths &&
      floor &&
      buildingAge &&
      listerType &&
      paymentMethod &&
      furnished &&
      mortgaged 
      
      
    ) {
      

      await AdForSale.create({
        userId: userId,
        title: title,
        videoLink: videoLink,
        propertyType: propertyType,
        category: category,
        description: description,
        city: city,
        price: price,
        rooms: rooms,
        surfaceArea: surfaceArea,
        paths: paths,
        floor: floor,
        buildingAge: buildingAge,
        listerType: listerType,
        paymentMethod: paymentMethod,
        furnished: furnished,
        mortgaged: mortgaged,
        projectedBy: "projectedBy",
        images: ["images1.jpg", "images2.jpg", "images3.jpg"],
      });
     
      const saleProCom = await AdForSale.find({ category: "commercial" });
      const saleProRes = await AdForSale.find({ category: "residential" });
      const rentProRes = await AdForRent.find({ category: "residential" });
      const rentProCom = await AdForRent.find({ category: "commercial" });
      const allProducts = [...rentProRes, ...rentProCom, ...saleProRes, ...saleProCom];

      //console.log({ saleProCom,saleProRes,allProducts, massage: " save success in database" });
      res.json({ saleProCom,saleProRes,allProducts, massage: " save success in database" });
    } else {
      res.json({ error: "all fields is required" });
    }
  } catch (error) {
    res.json(error);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createAdForRent = async (req, res, next) => {
 
  let productImg = [];
  const {
    title,
    userId,
    videoLink,
    propertyType,
    category,
    description,
    city,
    price,
    rooms,
    surfaceArea,
    paths,
    floor,
    buildingAge,
    listerType,
    paymentMethod,
    furnished,
    mortgaged,
    projectedBy,
    unitDetails,
  } = req.body;

  try {
    if (
      (title && userId,
      videoLink &&
        propertyType &&
        category &&
        description &&
        city &&
        price &&
        rooms &&
        surfaceArea &&
        paths &&
        floor &&
        buildingAge &&
        listerType &&
        paymentMethod &&
        furnished &&
        mortgaged &&
        unitDetails 
        )
    ) {
     

      await AdForRent.create({
        title: title,
        userId: userId,
        videoLink: videoLink,
        propertyType: propertyType,
        category: category,
        description: description,
        city: city,
        price: price,
        rooms: rooms,
        surfaceArea: surfaceArea,
        paths: paths,
        floor: floor,
        buildingAge: buildingAge,
        listerType: listerType,
        paymentMethod: paymentMethod,
        furnished: furnished,
        mortgaged: mortgaged,
        projectedBy: "projectedBy",                 //req.files.logo[0].filename,
        images: ["images1.jpg", "images2.jpg", "images3.jpg"],
        unitDetails: unitDetails,
      });
      const rentProRes = await AdForRent.find({ category: "residential" });
      const rentProCom = await AdForRent.find({ category: "commercial" });
      const saleProCom = await AdForSale.find({ category: "commercial" });
      const saleProRes = await AdForSale.find({ category: "residential" });
      const allProducts = [...rentProRes, ...rentProCom, ...saleProRes, ...saleProCom];
      res.json({rentProCom,rentProRes,allProducts, massage: " save success in database" });
    } else {
      res.json({ error: "all fields is required" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const searchSale = async (req, res, next) => {
 // console.log(req.body);

  const products = await AdForSale.find(req.body);
  res.json(products);
};
export const searchRent = async (req, res, next) => {
 // console.log(req.body);

  const products = await AdForRent.find(req.body);
  res.json(products);
};

export const getProducts = async (req, res, next) => {
  try {
    const rentProRes = await AdForRent.find({ category: "residential" });
    const rentProCom = await AdForRent.find({ category: "commercial" });
    const saleProCom = await AdForSale.find({ category: "commercial" });
    const saleProRes = await AdForSale.find({ category: "residential" });
    const allProducts = [...rentProRes, ...rentProCom, ...saleProRes, ...saleProCom];

    return res.json({rentProCom, rentProRes, saleProCom, saleProRes, allProducts});
  } catch (error) {
    res.json(error);
  }
};








///////////////////////////////////////////////////////////////////////////////////////

/*
export const createAdForSale = async (req, res, next) => {
  
  console.log(req.files);
  
  let productImg = [];
  const {
    userId,
    title,
    videoLink,
    propertyType,
    category,
    description,
    city,
    price,
    rooms,
    surfaceArea,
    paths,
    floor,
    buildingAge,
    listerType,
    paymentMethod,
    furnished,
    mortgaged,
  } = JSON.parse(req.body.ads);

  try {
    if (
      title &&
      userId &&
      videoLink &&
      propertyType &&
      category &&
      description &&
      city &&
      price &&
      rooms &&
      surfaceArea &&
      paths &&
      floor &&
      buildingAge &&
      listerType &&
      paymentMethod &&
      furnished &&
      mortgaged && req.files
      
      
    ) {
      req.files &&
        req.files.proImg.map(
          (file, index) => (productImg = [...productImg, file.filename])
        );

      await AdForSale.create({
        userId: userId,
        title: title,
        videoLink: videoLink,
        propertyType: propertyType,
        category: category,
        description: description,
        city: city,
        price: price,
        rooms: rooms,
        surfaceArea: surfaceArea,
        paths: paths,
        floor: floor,
        buildingAge: buildingAge,
        listerType: listerType,
        paymentMethod: paymentMethod,
        furnished: furnished,
        mortgaged: mortgaged,
        projectedBy: req.files.logo[0].filename,
        images: productImg,
      });
     
      const saleProCom = await AdForSale.find({ category: "commercial" });
      const saleProRes = await AdForSale.find({ category: "residential" });
      const rentProRes = await AdForRent.find({ category: "residential" });
      const rentProCom = await AdForRent.find({ category: "commercial" });
      const allProducts = [...rentProRes, ...rentProCom, ...saleProRes, ...saleProCom];

      //console.log({ saleProCom,saleProRes,allProducts, massage: " save success in database" });
      res.json({ saleProCom,saleProRes,allProducts, massage: " save success in database" });
    } else {
      res.json({ error: "all fields is required" });
    }
  } catch (error) {
    res.json(error);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createAdForRent = async (req, res, next) => {
 console.log(req.body);
  console.log(req.files);
  let productImg = [];
  const {
    title,
    userId,
    videoLink,
    propertyType,
    category,
    description,
    city,
    price,
    rooms,
    surfaceArea,
    paths,
    floor,
    buildingAge,
    listerType,
    paymentMethod,
    furnished,
    mortgaged,
    projectedBy,
    unitDetails,
  } = JSON.parse(req.body.ads);

  try {
    if (
      (title && userId,
      videoLink &&
        propertyType &&
        category &&
        description &&
        city &&
        price &&
        rooms &&
        surfaceArea &&
        paths &&
        floor &&
        buildingAge &&
        listerType &&
        paymentMethod &&
        furnished &&
        mortgaged &&
        unitDetails &&
        req.files
        )
    ) {
      req.files &&
        req.files.proImg.map(
          (file, index) => (productImg = [...productImg, file.filename])
        );

      await AdForRent.create({
        title: title,
        userId: userId,
        videoLink: videoLink,
        propertyType: propertyType,
        category: category,
        description: description,
        city: city,
        price: price,
        rooms: rooms,
        surfaceArea: surfaceArea,
        paths: paths,
        floor: floor,
        buildingAge: buildingAge,
        listerType: listerType,
        paymentMethod: paymentMethod,
        furnished: furnished,
        mortgaged: mortgaged,
        projectedBy:  req.files.logo[0].filename,                 //req.files.logo[0].filename,
        images: productImg,
        unitDetails: unitDetails,
      });
      const rentProRes = await AdForRent.find({ category: "residential" });
      const rentProCom = await AdForRent.find({ category: "commercial" });
      const saleProCom = await AdForSale.find({ category: "commercial" });
      const saleProRes = await AdForSale.find({ category: "residential" });
      const allProducts = [...rentProRes, ...rentProCom, ...saleProRes, ...saleProCom];
      res.json({rentProCom,rentProRes,allProducts, massage: " save success in database" });
    } else {
      res.json({ error: "all fields is required" });
    }
  } catch (error) {
    res.json(error);
  }
};







*/