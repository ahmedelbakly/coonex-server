import { Schema, model } from "mongoose";

const adForRentSchema = Schema({
 title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

 
  images: {
    type: [String],
    required: true,
  },

  city: String,
  price: Number,
  rooms:{
    type: Number,
    required: true,
  },
  surfaceArea:{
    type: Number,
    required: true,
  },
  paths:{
    type: Number,
    required: true,
  },
  floor:{
    type: Number,
    required: true,
  },
  buildingAge:{
    type: Number,
    required: true,
  },
 listerType:{
    type: String,
    required: true,
  },
 paymentMethod:{
    type: String,
    required: true,
  },
 furnished:{
    type: String,
    required: true,
  },
 mortgaged:{
    type: String,
    required: true,
  },
 projectedBy:{
    type: String,
    required: true,
  },
 unitDetails:{
    type:[ String],
    required: true,
  },

});

export const AdForRent = model("AdForRent", adForRentSchema);
///////////////////////////////////////////////////////////////////////////////////////



const adForSaleSchema = Schema({
 title: {
    type: String,
    required: true,
  },
 userId: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

 
  images: {
    type: [String],
    required: true,
  },

  city: String,
  price: Number,
  rooms:{
    type: Number,
    required: true,
  },
  surfaceArea:{
    type: Number,
    required: true,
  },
  paths:{
    type: Number,
    required: true,
  },
  floor:{
    type: Number,
    required: true,
  },
  buildingAge:{
    type: Number,
    required: true,
  },
 listerType:{
    type: String,
    required: true,
  },
 paymentMethod:{
    type: String,
    required: true,
  },
 furnished:{
    type: String,
    required: true,
  },
 mortgaged:{
    type: String,
    required: true,
  },
 projectedBy:{
    type: String,
    required: true,
  }
 
});

export const AdForSale = model("AdForSale", adForSaleSchema);