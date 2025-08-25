import { model } from "@medusajs/framework/utils"

export const Custom = model.define("custom", {
  id: model.id().primaryKey(),
  custom_name: model.text().nullable(),
  faq: model.json().nullable(),
  maindescription: model.text().nullable(),
  video: model.text().nullable()
})