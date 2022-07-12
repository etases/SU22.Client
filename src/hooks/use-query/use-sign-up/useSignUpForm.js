import { useForm } from '@mantine/form'
import { model, schema } from './schema'
export function useSignUpForm() {
    const { ...restProps } = useForm({
        initialValues: {
            [model.username]: 'admin123',
            [model.password]: 'Admin@admin1',
            [model.passwordConfirmation]: 'Admin@admin1',
        },
        validate: schema,
    })

    return { model, ...restProps }
}
