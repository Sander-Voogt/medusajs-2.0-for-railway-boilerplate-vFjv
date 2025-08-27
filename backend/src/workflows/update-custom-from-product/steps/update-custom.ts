import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { HELLO_MODULE } from "../../../modules/hello"
import HelloModuleService from "../../../modules/hello/service"

type UpdateCustomStepInput = {
  id: string | null
  custom_name: string | null
  faq: string | null
  video: string | null
  maindescription: string | null
}

export const updateCustomStep = createStep(
  "update-custom",
  async ({ id, custom_name, faq, maindescription, video }: UpdateCustomStepInput, { container }) => {
    const helloModuleService: HelloModuleService = container.resolve(
      HELLO_MODULE
    )

    const prevData = await helloModuleService.retrieveCustom(id)

    const custom = await helloModuleService.updateCustoms({
      id,
      custom_name,
      faq,
      maindescription,
      video
    })

    return new StepResponse(custom, prevData)
  },
  async (prevData, { container }) => {
    const helloModuleService: HelloModuleService = container.resolve(
      HELLO_MODULE
    )

    await helloModuleService.updateCustoms(prevData)
  }
)