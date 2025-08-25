import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Container, Heading, Input, Label, Tabs, Toaster, toast } from "@medusajs/ui"
import { sdk } from "../../../../lib/sdk"
import { useQuery } from "@tanstack/react-query"
import { Controller, FormProvider, useForm } from "react-hook-form"
import MyEditor from "../../../../components/CKEditor"
import Laadkabels from "./Laadkabel"
import UploadPage from "./Upload"

const CustomPage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  type CarModel = {
    id: string
    name: string
    title: string | null
    description: string | null
    ModelBannerDescription: string | null
  }

  const { data, isLoading } = useQuery<CarModel>({
    queryFn: () => sdk.client.fetch(`/admin/carmodels/${id}`),
    queryKey: ["carmodel", id],
  })

  const form = useForm<CarModel>({
    defaultValues: data,
    values: data, // zorgt dat query data in form komt
  })

  const onSubmit = async (formValues: CarModel) => {
    setLoading(true)
    try {
      const res = await sdk.client.fetch(`/admin/carmodels/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-medusa-access-token": localStorage.getItem("medusa_admin_token") || "",
        },
        body: formValues,
      })

      console.log(res, res.status)
      if (!res.ok) {
        throw new Error(`Fout bij updaten: ${res.status}`)
      }

      toast.success("Success", {
        description: "Record updated successfully",
        duration: 5000,
      })

      const updated = await res.json()
      console.log("Updated model:", updated)
    } catch (error) {
      console.error(error)
      toast.error("Fout", { description: String(error) })
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <FormProvider {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Container className="divide-y p-0">
          <div className="flex items-center justify-between px-6 py-4">
            <Heading level="h1">Car Model: {data?.name}</Heading>
            <Button type="submit" disabled={loading}>
              {loading ? "Opslaan..." : "Save"}
            </Button>
          </div>
          <Tabs defaultValue="general">
            <Tabs.List>
              <Tabs.Trigger value="general">General</Tabs.Trigger>
              <Tabs.Trigger value="SEO">SEO</Tabs.Trigger>
              <Tabs.Trigger value="laadkabels">Laadkabels</Tabs.Trigger>
            </Tabs.List>
            <div className="mt-2">
              <Tabs.Content value="general">
                <Label className="text-gray-500">Name</Label>
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field }) => <Input {...field} />}
                />

                <Label className="text-gray-500">Title</Label>
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field }) => <Input {...field} />}
                />

                <Label className="text-gray-500">Description</Label>
                <MyEditor
                  value={form.watch("description") || ""}
                  onChange={(value) => form.setValue("description", value)}
                />

                <Label className="text-gray-500">Header description</Label>
                <MyEditor
                  value={form.watch("ModelBannerDescription") || ""}
                  onChange={(value) => form.setValue("ModelBannerDescription", value)}
                />
              </Tabs.Content>

              <Tabs.Content value="laadkabels">
                <Laadkabels />
              </Tabs.Content>
            </div>
          </Tabs>
        </Container>
      </form>
    </FormProvider>
  )
}

export default CustomPage
