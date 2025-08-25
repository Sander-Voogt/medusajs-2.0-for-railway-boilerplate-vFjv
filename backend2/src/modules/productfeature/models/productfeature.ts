import { model } from "@medusajs/framework/utils"

export const ProductFeature = model.define("productfeature", {
  id: model.id().primaryKey(),
  custom_name: model.text().nullable(),
  description: model.text().nullable(),
  video: model.text().nullable(),
  procon: model.json().nullable(),
  faq: model.json().nullable(),
  evservicechoice: model.boolean().nullable()
})