import React, { useState } from "react"
import { Button, Input, Container, Heading } from "@medusajs/ui"
import Medusa from "@medusajs/js-sdk"

// Init SDK
const sdk = new Medusa({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: { type: "session" }, // of type: "api_key" als je admin API key gebruikt
})

const UploadPage = () => {
  const [files, setFiles] = useState<File[]>([])
  const [uploadResults, setUploadResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = async () => {
    if (!files.length) return
    setLoading(true)

    try {
      // SDK gebruikt File-objecten direct
      const res = await sdk.admin.upload.create({
        files,
      })

      console.log("Uploaded files:", res.files)
      // Haal URL's uit response
      const urls = res.files.map((f) => f.url)
      setUploadResults(urls)
    } catch (err) {
      console.error("Upload failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Heading level="h1">Upload Images</Heading>
      <div className="my-4">
        <Input
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
      </div>
      <Button onClick={handleUpload} disabled={!files.length || loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>

      {uploadResults.length > 0 && (
        <div className="mt-4">
          <p>Uploaded files:</p>
          <ul>
            {uploadResults.map((url, index) => (
              <li key={index}>
                <p>URL: {url}</p>
                <img src={url} alt={`Uploaded ${index + 1}`} className="mt-2 max-w-xs" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  )
}

export default UploadPage
