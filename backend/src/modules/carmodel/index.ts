import { Module } from "@medusajs/framework/utils"
import CarModelModuleService from "./service"

export const CARMODEL_MODULE = "carmodel"

export default Module(CARMODEL_MODULE, {
  service: CarModelModuleService,
})