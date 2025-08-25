import { createWorkflow, ReturnWorkflow, transform, when, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { ProductDTO } from "@medusajs/framework/types"
import { createRemoteLinkStep } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"
import { HELLO_MODULE } from "../../modules/hello"
import { createCustomStep } from "./steps/create-custom"

export type CreateCustomFromProductWorkflowInput = {
  product: ProductDTO
  additional_data?: {
    custom_name?: string
  }
}

export const createCustomFromProductWorkflow: any = createWorkflow(
  "create-custom-from-product",
  (input: CreateCustomFromProductWorkflowInput) => {
    const customName = transform(
      {
        input,
      },
      (data) => data.input.additional_data.custom_name || ""
    )

    const custom = createCustomStep({
      custom_name: customName,
    })

    when(({ custom }), ({ custom }) => custom !== undefined)
      .then(() => {
        createRemoteLinkStep([{
          [Modules.PRODUCT]: {
            product_id: input.product.id,
          },
          [HELLO_MODULE]: {
            custom_id: custom.id,
          },
        }])
      })

    return new WorkflowResponse({
      custom,
    })
  }
)