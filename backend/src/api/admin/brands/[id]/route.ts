import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve("query")

  // Kijk of er een ID wordt meegegeven
  const { id } = req.params

  const baseConfig = {
    entity: "brand",
    //@ts-ignore
    fields: ["id", "name", "created_at"],
    ...req.queryConfig,
  }

  // Als er een ID is, voeg een filter toe
  if (id) {
    const { data: brands } = await query.graph({
      ...baseConfig,
      filters: { id },
    })

    if (!brands || brands.length === 0) {
      return res.status(404).json({ message: "Car brand not found" })
    }

    return res.json(brands[0]) // Enkel record teruggeven
  }

  // Anders: lijst ophalen
  const {
    data: brands,
    metadata: { count, take, skip } = {},
  } = await query.graph(baseConfig)

  return res.json({
    brands,
    count,
    limit: take,
    offset: skip,
  })
}
