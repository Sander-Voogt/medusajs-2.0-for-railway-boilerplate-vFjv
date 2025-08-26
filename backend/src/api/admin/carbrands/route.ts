import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import {
    createCarModelWorkflow,
} from "../../../workflows/create-carmodel"
import { z } from "zod"
import { PostAdminCreateCarBrand } from "./validators"

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateCarBrand>


export const POST = async (
    req: MedusaRequest<PostAdminCreateBrandType>,
    res: MedusaResponse
) => {
    const { result } = await createCarModelWorkflow(req.scope)
        .run({
            //@ts-ignore
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
        //@ts-ignore
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