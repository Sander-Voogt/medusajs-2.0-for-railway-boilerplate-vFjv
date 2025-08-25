import { Module } from "@medusajs/framework/utils"
import CarBrandModuleService from "./service"

export const CARBRAND_MODULE = "carbrand"

export default Module(CARBRAND_MODULE, {
  service: CarBrandModuleService,
})