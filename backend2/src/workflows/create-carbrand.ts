import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse
} from "@medusajs/framework/workflows-sdk"
import { CARBRAND_MODULE } from "../modules/carbrand"
import CarBrandModuleService from "../modules/carbrand/service"

export type CreateBrandStepInput = {
    name: string,
    title: string,
    intro: string,
    description: string,
    image: string
}

type CreateBrandWorkflowInput = {
    name: string,
    title: string,
    intro: string,
    description: string,
    image: string
}


export const createBrandStep = createStep(
    "create-carbrand-step",
    async (input: CreateBrandStepInput, { container }) => {
        const carbrandModuleService: CarBrandModuleService = container.resolve(
            CARBRAND_MODULE
        )

        const carbrand = await carbrandModuleService.createCarbrands(input)

        return new StepResponse(carbrand, carbrand.id)
    },
    async (id: string, { container }) => {
        const brandModuleService: CarBrandModuleService = container.resolve(
            CARBRAND_MODULE
        )

        await brandModuleService.deleteCarbrands(id)
    }
)


export const createCarBrandWorkflow = createWorkflow(
    "create-carbrand",
    (input: CreateBrandWorkflowInput) => {
        const brand = createBrandStep(input)

        return new WorkflowResponse(brand)
    }
)