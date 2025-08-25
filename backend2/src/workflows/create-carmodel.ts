import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse
} from "@medusajs/framework/workflows-sdk"
import { CARMODEL_MODULE } from "../modules/carmodel"
import CarModelModuleService from "../modules/carmodel/service"



export type CreateCarModelWorkflowInput = { name?: string; title?: string; intro?: string; description?: string; image?: string; }

export const createBrandStep = createStep(
    "create-carmodel-step",
    async (input: CreateCarModelWorkflowInput, { container }) => {
        const carmodelModuleService: CarModelModuleService = container.resolve(
            CARMODEL_MODULE
        )

        const carmodelbrand = await carmodelModuleService.createCarmodels(input)

        return new StepResponse(carmodelbrand, carmodelbrand.id)
    },
    async (id: string, { container }) => {
        const brandModuleService: CarModelModuleService = container.resolve(
            CARMODEL_MODULE
        )

        await brandModuleService.deleteCarmodels(id)
    }

)


export const createCarModelWorkflow = createWorkflow(
    "create-carmodel",
    (input: CreateCarModelWorkflowInput) => {
        const brand = createBrandStep(input)

        return new WorkflowResponse(brand)
    }
)