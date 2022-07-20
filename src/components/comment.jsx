import { Button, Group, Modal, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { fetchApi, useTranslation } from '~/hooks'
import { useQueryClient } from '~/hooks/use-query/useQueryClient'

export function useAddCommentModal(categoryId, parentId = null) {
	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	const form = useForm({
		initialValues: {
			content: '',
			keyword: '',
		},

		validate: {
			content: (value) =>
				value.length > 0
					? null
					: translator({ key: 'comment.content_required' }),
			keyword: (value) =>
				value.length > 0
					? null
					: translator({ key: 'comment.keyword_required' }),
		},
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: 'addTopic',
		mutationFn: async (values) =>
			fetchApi({
				method: 'POST',
				endpoint: '/comment',
				body: { ...values, categoryId, ...(parentId ? { parentId } : {}) },
			}),
		onSuccess: (res) => {
			console.log(res)
			queryClient.invalidateQueries({
				queryKey: ['search'],
				exact: false,
			})
			queryClient.invalidateQueries(['comments', { topicId: parentId }])
			showNotification({ message: 'created' })
		},
	})

	const [opened, setOpened] = useState(false)

	const component = (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			title={
				parentId == null
					? translator({ key: 'comment.add_topic' })
					: translator({ key: 'comment.add_comment' })
			}>
			<form onSubmit={form.onSubmit(mutate)}>
				<Textarea
					required
					label={translator({ key: 'comment.content' })}
					{...form.getInputProps('content')}
				/>

				<TextInput
					required
					label={translator({ key: 'comment.keyword' })}
					placeholder='abc,def,ghi'
					{...form.getInputProps('keyword')}
				/>

				<Group
					position='right'
					mt='md'>
					<Button type='submit'>{translator({ key: 'comment.submit' })}</Button>
				</Group>
			</form>
		</Modal>
	)

	return {
		component,
		setOpened,
	}
}

export function useUpdateCommentModal(commentId) {
	const translator = useTranslation({
		getTranslatorOnly: true,
	})
	const form = useForm({
		initialValues: {
			content: '',
			keyword: '',
		},

		validate: {
			content: (value) =>
				value.length > 0
					? null
					: translator({ key: 'comment.content_required' }),
			keyword: (value) =>
				value.length > 0
					? null
					: translator({ key: 'comment.keyword_required' }),
		},
	})

	const [opened, setOpened] = useState(false)

	const component = (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			title={translator({ key: 'comment.update_content' })}>
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
				<Textarea
					required
					label={translator({ key: 'comment.content' })}
					{...form.getInputProps('content')}
				/>

				<TextInput
					required
					label={translator({ key: 'comment.keyword' })}
					placeholder='abc,def,ghi'
					{...form.getInputProps('keyword')}
				/>

				<Group
					position='right'
					mt='md'>
					<Button type='submit'>{translator({ key: 'comment.submit' })}</Button>
				</Group>
			</form>
		</Modal>
	)
	return {
		component,
		setOpened,
	}
}
