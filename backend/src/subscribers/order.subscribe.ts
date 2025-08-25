import type {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"

export default async function orderPlacedHandler({
  event: { data: order },
  container,
}: SubscriberArgs<any>) {  // je kunt eventueel de juiste type definieren als je wilt

const customerModuleService = container.resolve("customer")
const orderModuleService = container.resolve("order")



  let customer
  let currentAddress
  let currentOrder
  let isExistingCustomer: boolean | null = null

  try {
    currentOrder = await orderModuleService.retrieveOrder(order.id, {
      relations: ["billing_address"],
    })
    console.log(currentOrder)
    // 1. Haal de klant op via customerModuleService
    customer = await customerModuleService.retrieveCustomer(currentOrder.customer_id, {
      relations: ["addresses"],
    })

    console.log(customer)

    isExistingCustomer = customer.has_account
  } catch (err) {
    console.error(`❌ Fout bij ophalen klant ${order.id}:`, err)
    return // Stop hier als we klant niet kunnen ophalen
  }

  // 2. Bepaal of het een gast is
  if (isExistingCustomer === true) {
    console.log("✅ Geregistreerde klant:", customer.email)
    return
  }

  if (isExistingCustomer === false) {
    console.log("👤 Gastklant:", customer.email)

    const informerData = await createCustomerInInformer(currentOrder)

    if (informerData?.id) {
      try {
        await customerModuleService.updateCustomers(customer.id, {
          metadata: {
            informer_id: informerData.id,
          },
        })

        console.log(`📌 Klant geüpdatet met informer_id: ${informerData.id}`)
      } catch (err) {
        console.error(`❌ Fout bij updaten klant ${customer.id}:`, err)
      }
    }
  }

  console.log(`Order ${order.id} geplaatst door klant ${customer.email}`)
}

// Vergeet niet je createCustomer functie te importeren of definiëren
async function createCustomerInInformer(customer: any) {


  const businessCustomer = customer.billing_address.company ? "1" : "0"

  const newCustomer = {
    relation_number: "0",
    relation_type: businessCustomer,
    company_name: customer.billing_address.company_name,
    firstname: customer.billing_address.first_name,
    surname_prefix: "",
    surname: customer.billing_address.last_name,
    street: customer.billing_address.address_1,
    house_number: '-',
    house_number_suffix: "",
    zip: customer.billing_address.postal_code,
    city: customer.billing_address.city,
    country: customer.billing_address.country_code.toUpperCase(),
    phone_number: customer.billing_address.phone,
    fax_number: "",
    web: "",
    email: customer.email,
    coc: "",
    vat: "",
    iban: "",
    bic: "",
    email_invoice: customer.email,
    sales_invoice_template_id: "515360",
    payment_condition_id: "677869",
  }

  console.log("📤 Relatie aanmaken in Informer:", newCustomer)

  try {
    const response = await fetch("https://api.informer.eu/v1/relation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Securitycode: "30751083",
        Apikey: "BtmlQbpSBD1e2UjxvRUy7QlkIpfhbudQ99ifbFjHr5XEz9Ebd5s",
      },
      body: JSON.stringify(newCustomer),
    })

    const contentType = response.headers.get("content-type") || ""

    if (!response.ok) {
      const errorBody = contentType.includes("application/json")
        ? await response.json()
        : await response.text()

      console.error(`❌ Mislukt om relatie aan te maken:`, errorBody)
      return null
    }

    const result = await response.json()
    console.log(`✅ Relatie succesvol aangemaakt voor ${customer.email}`, result)
    return result
  } catch (err) {
    console.error(`❌ Fout bij aanmaken relatie voor ${customer.email}:`, err)
    return null
  }
}


export const config: SubscriberConfig = {
  event: "order.placed",
}
