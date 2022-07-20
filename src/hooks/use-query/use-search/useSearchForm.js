import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { model } from './schema'
export function useSearchForm() {
	const { ...restProps } = useForm({
		initialValues: {
			[model.categoryId]: '',
			[model.keyword]: '',
		},
		validate: {
			[model.categoryId]: (value) => {
				if (!value) {
					showNotification({
						color: 'red',
						message: 'Please select a category',
					})
					return 'Category is required'
				}
			},
		},
	})

	return { model, ...restProps }
}
