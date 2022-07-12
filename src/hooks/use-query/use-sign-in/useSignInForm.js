import { useForm, zodResolver } from '@mantine/form'
import { model, schema } from './schema'
export function useSignInForm() {
    const { ...restProps } = useForm({
        initialValues: {
            [model.username]: '',
            [model.password]: '',
        },
        schema: zodResolver(schema),
    })

    return { model, ...restProps }
}
