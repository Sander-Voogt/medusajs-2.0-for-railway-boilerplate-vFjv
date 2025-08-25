import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http"
import { PostAdminCreateCarBrand } from "./admin/carbrands/validators"
import { PostAdminCreateCarModel } from "./admin/carmodels/validators"
import { z } from "zod"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import { PostAdminCreateBrand } from "./admin/brands/validators"
export const GetBrandsSchema = createFindParams()

export default defineMiddlewares({
  routes: [
    {
      method: "POST",
      matcher: "/admin/products",
      additionalDataValidator: {
        custom_name: z.string().optional(),
        faq: z.string().optional(),
        maindescription: z.string().optional()
      },
    },


    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateBrand),
      ],
    },
    {
      matcher: "/admin/products",
      method: ["POST"],
      additionalDataValidator: {
        brand_id: z.string().optional(),
      },
    },
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
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