import { useParams } from "react-router-dom"
import { Container, Heading } from "@medusajs/ui"
import { sdk } from "../../../lib/sdk"
import { useQuery } from "@tanstack/react-query"

const CustomPage = () => {
  const { id } = useParams()
  type Brand = {
    id: string
    name: string
  }
  type BrandsResponse = {
    name:string
  }

      const limit = 15
      const offset = 0

  const { data, isLoading } = useQuery<BrandsResponse>({
    queryFn: () => sdk.client.fetch(`/admin/carbrands/${id}`, {
      query: {
        limit,
        offset,
      },
    }),
    queryKey: [["carbrands", limit, offset]],
  })

  console.log(data) 

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Passed ID: {data?.name}</Heading>
      </div>
    </Container>
  )
}

export default CustomPage
