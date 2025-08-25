import BrandModule from "../modules/brand"
import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"
import CarModelModule from "../modules/carmodel"
import CarBrandModule from "../modules/carbrand"

export default defineLink(
  {
    linkable: CarModelModule.linkable.carmodel,
    isList: true,
  },
  CarBrandModule.linkable.carbrand
)