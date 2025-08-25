import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"
import CarModelModule from "../modules/carmodel"

export default defineLink(
  CarModelModule.linkable.carmodel,
  ProductModule.linkable.product,
)