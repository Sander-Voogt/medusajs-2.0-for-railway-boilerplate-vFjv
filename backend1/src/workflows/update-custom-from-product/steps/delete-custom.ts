import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Custom } from "../../../modules/hello/models/custom"
import { InferTypeOf } from "@medusajs/framework/types"
import HelloModuleService from "../../../modules/hello/service"
import { HELLO_MODULE } from "../../../modules/hello"

type DeleteCustomStepInput = {
  custom: InferTypeOf<typeof Custom>
}

export const deleteCustomStep = createStep(
  "delete-custom",
  async ({ custom }: DeleteCustomStepInput, { container }) => {
    const helloModuleService: HelloModuleService = container.resolve(
      HELLO_MODULE
    )

    await helloModuleService.deleteCustoms(custom.id)

    return new StepResponse(custom, custom)
  },
  async (custom, { container }) => {
    const helloModuleService: HelloModuleService = container.resolve(
      HELLO_MODULE
    )

    //@ts-ignore
    await helloModuleService.createCustoms(custom)
  }
)