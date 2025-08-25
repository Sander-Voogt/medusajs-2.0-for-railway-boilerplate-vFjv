import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http"

import { z, type ZodRawShape } from "zod"

// Schema voor GET /admin/brands
export const GetBrandsSchema = z.object({
  fields: z.string().optional(),
  offset: z.number().optional().default(0),
  limit: z.number().optional().default(50),
  order: z.string().optional(),
  with_deleted: z.boolean().optional(),
})
export type GetBrandsSchemaType = z.infer<typeof GetBrandsSchema>

const additionalDataValidator = {
  custom_name: z.string().optional(),
  faq: z.string().optional(),
  maindescription: z.string().optional(),
  brand_id: z.string().optional(),
} as unknown as ZodRawShape


// Inline validator schemas
const PostAdminCreateBrand = z.object({
  name: z.string(),
})

const PostAdminCreateCarModel = z.object({
  name: z.string(),
  title: z.string().optional(),
  intro: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
})

const PostAdminCreateCarBrand = z.object({
  name: z.string(),
  title: z.string().optional(),
  intro: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
})

export default defineMiddlewares({
  routes: [
    // {
    //   method: "POST",
    //   matcher: "/admin/products",
    //   additionalDataValidator: () => ({
    //     custom_name: z.string().optional(),
    //     faq: z.string().optional(),
    //     maindescription: z.string().optional(),
    //     brand_id: z.string().optional(),
    //   }),
    // },
    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateBrand)],
    },
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(GetBrandsSchema, {
          defaults: ["id", "name", "products.*"],
          isList: true,
        }),
      ],
    },
    {
      matcher: "/admin/carbrands",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateCarBrand)],
    },
    {
      matcher: "/admin/carmodels",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateCarModel)],
    },
  ],
})
