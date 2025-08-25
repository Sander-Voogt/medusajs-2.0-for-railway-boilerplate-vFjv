import { model } from "@medusajs/framework/utils"

export const Carbrand = model.define("carbrand", {
  id: model.id().primaryKey(),
  name: model.text(),
  title: model.text().nullable(),
  intro: model.text().nullable(),
  description: model.text().nullable(),
  image: model.text().nullable(),
  MetaKeywords: model.text().nullable(),
  MetaDescription: model.text().nullable(),
  MetaTitle: model.text().nullable(),
  Published: model.boolean().nullable(),
  Deleted: model.boolean().nullable(),
  DisplayOrder: model.number().nullable(),
  CreatedOnUtc: model.dateTime().nullable(),
  UpdatedOnUtc:model.dateTime().nullable(),
  BottomDescription: model.text().nullable(),
  StructuredData:model.text().nullable(),
  H1Title: model.text().nullable()
})