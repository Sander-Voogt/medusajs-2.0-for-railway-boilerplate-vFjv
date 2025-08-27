import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"
import HelloModuleService from "../modules/hello"

export default defineLink(
  ProductModule.linkable.product,
  HelloModuleService.linkable.custom
)