import { useForm, zodResolver } from '@mantine/form'
import { model, schema } from './schema'
export function useSignInForm() {
	const { ...restProps } = useForm({
		initialValues: {
			[model.username]: 'newbie',
			[model.password]: 'string',
		},
		schema: zodResolver(schema),
	})

	return { model, ...restProps }
}
