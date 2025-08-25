import { MedusaService } from "@medusajs/framework/utils"
import { Carmodel } from "./models/carmodel"

class CarModelModuleService extends MedusaService({
  Carmodel,
}) {

}

export default CarModelModuleService