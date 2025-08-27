import { completeOrderWorkflow, createOrderWorkflow } from "@medusajs/medusa/core-flows"

completeOrderWorkflow.hooks.ordersCompleted(
    (async ({ orders, additional_data }, { container }) => {
        for (const order in orders) {
            const customerService = container.resolve("customerService")

            let customer
            let isExistingCustomer: boolean | null = null

            try {
                // 1. Haal de klant op via customerService
                customer = await customerService.retrieve(order.customer_id, {
                    relations: ["addresses"],
                })

                isExistingCustomer = customer.has_account
            } catch (err) {
                console.error(`❌ Fout bij ophalen klant ${order.customer_id}:`, err)
                return // Stop hier als we klant niet kunnen ophalen
            }

            // 2. Bepaal of het een gast is
            if (isExistingCustomer === true) {
                console.log("✅ Geregistreerde klant:", customer.email)
                return
            }

            if (isExistingCustomer === false) {
                console.log("👤 Gastklant:", customer.email)

                const informerData = await createCustomer(customer)

                if (informerData?.id) {
                    try {
                        await customerService.update(customer.id, {
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
        }

    }
    ))

async function createCustomer(customer: any) {
    const billingAddress = customer.addresses?.find(
        (address) => address.is_default_billing === true
    )

    const businessCustomer = customer.company_name ? "1" : "0"

    const newCustomer = {
        relation_number: "0",
        relation_type: businessCustomer,
        company_name: customer.company_name,
        firstname: customer.first_name,
        surname_prefix: "",
        surname: customer.last_name,
        street: billingAddress?.address_1,
        house_number: billingAddress?.address_2,
        house_number_suffix: "",
        zip: billingAddress?.postal_code,
        city: billingAddress?.city,
        country: billingAddress?.country_code,
        phone_number: customer.phone,
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
