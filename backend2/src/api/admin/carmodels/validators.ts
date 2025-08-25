import { z } from "zod"

export const PostAdminCreateCarModel = z.object({
    name: z.string(),
    title: z.string().optional(),
    intro: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional()
})