import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http"
import { PostAdminCreateCarBrand } from "./admin/carbrands/validators"
import { PostAdminCreateCarModel } from "./admin/carmodels/validators"
import { z, type ZodRawShape } from "zod"

import { PostAdminCreateBrand } from "./admin/brands/validators"

export const GetBrandsSchema = z.object({
  fields: z.string().optional(),
  offset: z.number().optional().default(0),
  limit: z.number().optional().default(50),
  order: z.string().optional(),
  with_deleted: z.boolean().optional(),
})
export type GetBrandsSchemaType = z.infer<typeof GetBrandsSchema>

const additionalDataValidator: ZodRawShape = {
  custom_name: z.string().optional(),
  faq: z.string().optional(),
  maindescription: z.string().optional(),
}


export default defineMiddlewares({
  routes: [
    {
      method: "POST",
      matcher: "/admin/products",
      //@ts-ignore
      additionalDataValidator: additionalDataValidator
    },


    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [
        //@ts-ignore

        validateAndTransformBody(PostAdminCreateBrand),
      ],
    },
    {
      matcher: "/admin/products",
      method: ["POST"],
      additionalDataValidator: {
        //@ts-ignore

        brand_id: z.string().optional(),
      },
    },
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          //@ts-ignore

          GetBrandsSchema,
          {
            defaults: [
              "id",
              "name",
              "products.*",
            ],
            isList: true,
          }
        ),
      ],
    },



    {
      matcher: "/admin/carbrands",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateCarBrand),
      ],
    },
    {
      matcher: "/admin/carmodels",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateCarModel),
      ],
    },
  ],
})