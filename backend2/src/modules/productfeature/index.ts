import { Module } from "@medusajs/framework/utils"
import ProductFeatureService from "./service"

export const PRODUCTFEATURE_MODULE = "productfeature"

export default Module(PRODUCTFEATURE_MODULE, {
  service: ProductFeatureService,
})