import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { 
  createBrandWorkflow,
} from "../../../workflows/create-brand"

import { z } from "zod"
import { PostAdminCreateBrand } from "./validators"

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>


export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  const { result } = await createBrandWorkflow(req.scope)
    .run({
      input: req.body,
    })

  res.json({ brand: result })
}

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve("query")

  // Get id from route params or query string
  const { id } = req.params

  const baseConfig = {
    ...req.queryConfig,
    entity: "brand",
    fields: ["id", "name", "created_at"],
  }

  if (id) {
    // Return a single record when id is present
    const { data: brands } = await query.graph({
      ...baseConfig,
      filters: { id },
    })

    if (!brands || brands.length === 0) {
      return res.status(404).json({ message: "Brand not found" })
    }

    return res.json(brands[0])
  }

  // Default: return list of brands
  const {
    data: brands,
    metadata: { count, take, skip } = {},
  } = await query.graph(baseConfig)

  res.json({
    brands,
    count,
    limit: take,
    offset: skip,
  })
}