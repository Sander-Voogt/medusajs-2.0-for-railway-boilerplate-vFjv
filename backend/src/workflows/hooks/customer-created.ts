import { createCustomersWorkflow } from "@medusajs/medusa/core-flows"
import { sdk } from "../../admin/lib/sdk"

createCustomersWorkflow.hooks.customersCreated(
    (async ({ customers, additional_data }, { container }) => {
        for (const customer of customers) {
            console.log(customer.email)

            const billingaddress = customer.addresses.find((address) => address.is_default_billing === true)

            const businesscustomer = customer.company_name ? '1' : '0';
            const newcustomer = {

                relation_number: '0',
                relation_type: businesscustomer,
                company_name: customer.company_name,
                firstname: customer.first_name,
                surname_prefix: "",
                surname: customer.last_name,
                street: billingaddress?.address_1,
                house_number: billingaddress?.address_2,
                house_number_suffix: "",
                zip: billingaddress?.postal_code,
                city: billingaddress?.city,
                country: billingaddress?.country_code,
                phone_number: customer.phone,
                fax_number: "",
                web: "",
                email: customer.email,
                coc: "",
                vat: "",
                iban: "",
                bic: "",
                email_invoice: customer.email,
                sales_invoice_template_id: '515360',
                payment_condition_id: "677869"
            }
            console.log("Creating customer with data:", JSON.stringify(newcustomer, null, 2));

            try {
                const response = await fetch("https://api.informer.eu/v1/relation", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Securitycode": "30751083",
                        "Apikey": "BtmlQbpSBD1e2UjxvRUy7QlkIpfhbudQ99ifbFjHr5XEz9Ebd5s"
                    },
                    body: JSON.stringify(newcustomer)
                });

                if (!response.ok) {
                    const errorBody = await response.text(); // of .json() als je weet dat het JSON is
                    console.error(`Failed to create relation for ${customer.email}:`, errorBody);
                } else {
                    const result = await response.json();
                    console.log(`Successfully created relation for ${customer.email}`, result);
                }
            } catch (err) {
                console.error(`Error creating relation for ${customer.email}:`, err);
            }

        }

    })
)