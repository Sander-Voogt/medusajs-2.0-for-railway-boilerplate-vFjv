import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import { 
  UpdateCustomFromProductStepInput, 
  updateCustomFromProductWorkflow,
} from "../update-custom-from-product"

updateProductsWorkflow.hooks.productsUpdated(
	async ({ products, additional_data }, { container }) => {
    const workflow = updateCustomFromProductWorkflow(container)
    
    for (const product of products) {
      await workflow.run({
        input: {
          product,
          additional_data,
        } as UpdateCustomFromProductStepInput,
      })
    }
	}
)