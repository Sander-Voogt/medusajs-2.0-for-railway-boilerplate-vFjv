import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import {
  Button,
  clx,
  Container,
  Drawer,
  Heading,
  Input,
  Text,
} from "@medusajs/ui"
import { useQuery, useMutation } from "@tanstack/react-query"
import { sdk } from "../lib/sdk"
import { useEffect, useState } from "react"
import Faq from "../routes/components/faq"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { watch } from "fs"

type AdminProductBrand = AdminProduct & {
  brand?: {
    id: string
    name: string
  }
}

type CustomFields = {
  custom_name: string
  faq: string
}

const ProductBrandWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const { data: queryResult } = useQuery({
    queryFn: () =>
      sdk.admin.product.retrieve(product.id, {
        fields: "+custom.*",
      }),
    queryKey: [["product", product.id]],
  })

  const brandName = (queryResult?.product as AdminProductBrand)?.brand?.name

  console.log(queryResult?.product?.custom);

  const [content, setContent] = useState<CustomFields>(() => {
    return (queryResult?.product?.custom as CustomFields) ?? {
      custom_name: "",
      faq: [],
    }
  })

  useEffect(() => {
    if (queryResult?.product?.custom) {
      setContent(queryResult.product.custom as CustomFields)
    }
  }, [queryResult])

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
      // defaultValues: (queryResult?.product?.custom as CustomFields) ?? {
      //   custom_name: "",
      //   faq: [],
      // }

      defaultValues: queryResult?.product?.custom,
      values: queryResult?.product?.custom,
    }
  )


  const onSubmit: SubmitHandler<CustomFields> = (data) => updateProductMutation.mutate(data)

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Extra velden</Heading>
        </div>
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        
        <Drawer>
          <Drawer.Trigger asChild>
            <Button>Edit Variant</Button>
          </Drawer.Trigger>
          <Drawer.Content className="flex flex-col h-full max-h-screen">
            {/* Sticky header */}
            <Drawer.Header className="flex-shrink-0 border-b">
              <Drawer.Title>Edit Variant</Drawer.Title>
            </Drawer.Header>

            {/* Scrollable body */}
            <Drawer.Body className="flex-1 overflow-y-auto p-4">

              <Text>This is where you edit the variant&apos;s details</Text>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>


                  <Input
                    placeholder="Custom name"
                    id="custom-name"
                    value={form.watch('custom_name')}
                    onChange={(e) =>
                      form.setValue('custom_name', e.target.value)
                    }
                  />
                  <Faq />

                  <Button type="submit"
                  >
                    Save
                  </Button>

                </form>
              </FormProvider>

            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button variant="secondary">Cancel</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
})

export default ProductBrandWidget
