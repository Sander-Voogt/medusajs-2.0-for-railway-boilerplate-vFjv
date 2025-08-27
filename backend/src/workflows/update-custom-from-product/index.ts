import { ProductDTO } from "@medusajs/framework/types"
import { createWorkflow, when, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createRemoteLinkStep, dismissRemoteLinkStep, useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"
import { HELLO_MODULE } from "../../modules/hello"
import { deleteCustomStep } from "./steps/delete-custom"
import { updateCustomStep } from "./steps/update-custom"
import { createCustomStep } from "../create-custom-from-product/steps/create-custom"

export type UpdateCustomFromProductStepInput = {
    product: ProductDTO
    additional_data?: {
        custom_name?: string | null
    }
}

export const updateCustomFromProductWorkflow = createWorkflow(
    "update-custom-from-product",
    (input: UpdateCustomFromProductStepInput) => {
        const { data: products } = useQueryGraphStep({
            entity: "product",
            fields: ["custom.*"],
            filters: {
                id: input.product.id,
            },
        })

        const created = when(
            "create-product-custom-link",
            {
                input,
                products,
            }, (data) =>
            !data.products[0].custom &&
            data.input.additional_data?.custom_name?.length > 0
        )
            .then(() => {
                const custom = createCustomStep({
                    custom_name: input.additional_data.custom_name,
                    faq: input.additional_data.faq,
                    video: input.additional_data.video,
                    maindescription: input.additional_data.maindescription
                })

                createRemoteLinkStep([{
                    [Modules.PRODUCT]: {
                        product_id: input.product.id,
                    },
                    [HELLO_MODULE]: {
                        custom_id: custom.id,
                    },
                }])

                return custom
            })

        const deleted = when(
            "delete-product-custom-link",
            {
                input,
                products,
            }, (data) =>
            data.products[0].custom && (
                data.input.additional_data?.custom_name === null ||
                data.input.additional_data?.custom_name.length === 0
            )
        )
            .then(() => {
                deleteCustomStep({
                    custom: products[0].custom,
                })

                dismissRemoteLinkStep({
                    [HELLO_MODULE]: {
                        custom_id: products[0].custom.id,
                    },
                })

                return products[0].custom.id
            })

        const updated = when({
            input,
            products,
        }, (data) => data.products[0].custom && data.input.additional_data?.custom_name?.length > 0)
            .then(() => {
                return updateCustomStep({
                    id: products[0].custom.id,
                    custom_name: input.additional_data.custom_name,
                    faq: input.additional_data.faq,
                    video: input.additional_data.video,
                    maindescription: input.additional_data.maindescription
                })
            })

        return new WorkflowResponse({
            created,
            updated,
            deleted,
        })


    }
)