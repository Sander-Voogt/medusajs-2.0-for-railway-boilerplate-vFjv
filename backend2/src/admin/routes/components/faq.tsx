import { useFormContext, useFieldArray } from "react-hook-form"
import { Button, Container, Input, Label, Textarea } from "@medusajs/ui"

export default function Faq() {
    const { register, control } = useFormContext()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "faq",
    })

    return (
        <div>
            {fields.map((item, index) => (
                <Container key={item.id}>
                    <Label>Vraag</Label>
                    <Input
                        type="text"
                        placeholder="Titel"
                        {...register(`faq.${index}.title`)}
                    />

                    <Label>Antwoord</Label>
                    <Textarea
                        placeholder="Beschrijving"
                        {...register(`faq.${index}.description`)}
                    />

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => remove(index)}
                    >
                        Verwijder
                    </Button>
                </Container>
            ))}

            <Button
                type="button"
                onClick={() =>
                    append({
                        title: "",
                        description: "",
                    })
                }
            >
                Voeg item toe
            </Button>
        </div>
    )
}
