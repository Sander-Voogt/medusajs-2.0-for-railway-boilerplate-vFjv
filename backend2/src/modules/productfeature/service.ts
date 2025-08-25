import { MedusaService } from "@medusajs/framework/utils"
import { ProductFeature } from "./models/productfeature"

class ProductFeatureModuleService extends MedusaService({
    ProductFeature,
}) {

}

export default ProductFeatureModuleService