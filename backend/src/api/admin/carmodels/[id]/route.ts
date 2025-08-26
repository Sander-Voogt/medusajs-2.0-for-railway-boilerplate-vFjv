import { container, MedusaRequest, MedusaResponse } from "@medusajs/framework"
import CarModelModuleService from "../../../../modules/carmodel/service"
import { CARMODEL_MODULE } from "../../../../modules/carmodel"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve("query")

  // Kijk of er een ID wordt meegegeven
  const { id } = req.params

  const baseConfig = {
    entity: "carmodel",
    //@ts-ignore
    fields: ["*"],
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

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { id } = req.params

  const CarModelModuleService: CarModelModuleService = container.resolve(
    CARMODEL_MODULE
  )

  //@ts-ignore
  const response = await CarModelModuleService.updateCarmodels(req.body)
  // const { result } = await CarModelModuleService.update(id, req.scope)
  //   .run({
  //     input: req.body,
  //   })

  res.json(response)
}


