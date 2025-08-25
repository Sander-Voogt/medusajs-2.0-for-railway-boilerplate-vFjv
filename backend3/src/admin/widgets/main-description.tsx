import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import {
  Button,
  clx,
  Container,
  Drawer,
  FocusModal,
  Heading,
  Input,
  Text,
} from "@medusajs/ui"
import { useQuery, useMutation } from "@tanstack/react-query"
import { sdk } from "../lib/sdk"
import { useEffect, useState } from "react"
import Faq from "../routes/components/faq"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import MyEditor from "../components/CKEditor"

type AdminProductBrand = AdminProduct & {
  brand?: {
    id: string
    name: string
  }
}

type CustomFields = {
  custom_name: string
  faq: string,
  maindescription: string
}

const MainDescription = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const { data: queryResult } = useQuery({
    queryFn: () =>
      sdk.admin.product.retrieve(product.id, {
        fields: "+custom.*",
      }),
    queryKey: [["product", product.id]],
  })



  const updateProductMutation = useMutation({
    mutationFn: (data: CustomFields) =>
      sdk.admin.product.update(product.id, { additional_data: data }),
    onSuccess: () => {
      console.log("✅ Product updated")
      // eventueel: refetch query of laat een toast zien
    },
    onError: (err) => {
      console.error("❌ Failed to update product:", err)
    },
  })

  const submitForm = () => {
    updateProductMutation.mutate(content)
  }

  const form = useForm<CustomFields>(
    {
      defaultValues: queryResult?.product?.custom,
      values: queryResult?.product?.custom,
    }
  )


  const onSubmit: SubmitHandler<CustomFields> = (data) => updateProductMutation.mutate(data)

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Productbeschrijving</Heading>
        </div>
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >

        <FocusModal>
          <FocusModal.Trigger asChild>
            <Button>Edit Variant</Button>
          </FocusModal.Trigger>
          <FocusModal.Content>
            <FocusModal.Header>
              <FocusModal.Title>Edit Variant</FocusModal.Title>
            </FocusModal.Header>
            <FocusModal.Body className="flex flex-col items-center py-16">
              <div className="flex w-full max-w-lg flex-col gap-y-8">
                <div className="flex flex-col gap-y-1">
                  <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <MyEditor
                        value={form.watch("maindescription") || ""}
                        onChange={(_, editor) => {
                          const data = editor.getData()
                          form.setValue("maindescription", data)
                        }}
                      />

                      <Button type="submit"
                      >
                        Save
                      </Button>

                    </form>
                  </FormProvider>
                </div>
              </div>
            </FocusModal.Body>
            <FocusModal.Footer>
              <Button>Save</Button>
            </FocusModal.Footer>
          </FocusModal.Content>
        </FocusModal>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
})

export default MainDescription
