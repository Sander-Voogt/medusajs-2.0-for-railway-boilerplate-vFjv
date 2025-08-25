import { defineLink } from "@medusajs/framework/utils"
import ProductFeatureModule from "../modules/productfeature"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
  ProductModule.linkable.product,
  ProductFeatureModule.linkable.productfeature
)