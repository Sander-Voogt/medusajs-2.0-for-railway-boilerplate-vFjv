import { MedusaService } from "@medusajs/framework/utils"
import { Carbrand } from "./models/carbrand"

class CarBrandModuleService extends MedusaService({
  Carbrand,
}) {

}

export default CarBrandModuleService