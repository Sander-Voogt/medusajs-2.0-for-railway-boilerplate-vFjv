import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import {
    createCarModelWorkflow,
} from "../../../workflows/create-carmodel"
import { z } from "zod"
import { PostAdminCreateCarModel } from "./validators"

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateCarModel>


export const POST = async (
    req: MedusaRequest<PostAdminCreateBrandType>,
    res: MedusaResponse
) => {
    const { result } = await createCarModelWorkflow(req.scope)
        .run({
            input: req.body,
        })

    res.json({ a: result })
}


export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const query = req.scope.resolve("query")

    const {
        data: brands,
        metadata: { count, take, skip } = {},
    } = await query.graph({
        entity: "carbrand",
        fields: ["id", "name", "created_at", "carmodels.*"],
        ...req.queryConfig,
    })

    res.json({
        brands,
        count,
        limit: take,
        offset: skip,
    })
}