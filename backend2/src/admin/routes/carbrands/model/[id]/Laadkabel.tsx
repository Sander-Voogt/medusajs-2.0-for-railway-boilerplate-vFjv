import { Label, Switch } from "@medusajs/ui"
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form"

export default function Laadkabels() {

    const { register, control } = useFormContext()
    return (<div>

        <div className="flex items-center gap-x-2">
            <Controller
                name="is1F16A"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <>
                        <Label htmlFor="is1F16A">is1F16A</Label>
                        <Switch
                            checked={value}
                            onCheckedChange={onChange}
                            id="is1F16A"
                        />
                    </>
                )}
            />


        </div>
        <div className="flex items-center gap-x-2">
            <Switch {...register("is1F32A")} id="is1F32A" />
            <Label htmlFor="is1F32A">is1F32A</Label>
        </div>
        <div className="flex items-center gap-x-2">
            <Switch {...register("is3F16A")} id="is3F16A" />
            <Label htmlFor="is3F16A">is3F16A</Label>
        </div>
        <div className="flex items-center gap-x-2">
            <Switch {...register("is3F32A")} id="is3F32A" />
            <Label htmlFor="is3F32A">is3F32A</Label>
        </div>

    </div>)
}