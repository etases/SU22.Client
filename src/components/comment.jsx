import { useState } from 'react'
import { Button, Group, Modal, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export function useAddCommentModal(categoryId, parentId = null) {
	const form = useForm({
		initialValues: {
			content: '',
			keyword: '',
		},

		validate: {
			content: (value) => value.length > 0 ? null : 'Content is required',
			keyword: (value) => value.length > 0 ? null : 'Keyword is required'
		},
	});

	const [opened, setOpened] = useState(false);

	const component = (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			title={parentId == null ? "Add Topic" : "Add Comment"}
		>
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
				<Textarea
					required
					label="Content"
					{...form.getInputProps('content')}
				/>

				<TextInput
					required
					label="Keyword"
					placeholder="abc,def,ghi"
					{...form.getInputProps('keyword')}
				/>

				<Group position="right" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Modal>
	)

	return {
		component,
		setOpened
	};
}

export function useUpdateCommentModal(commentId) {
	const form = useForm({
		initialValues: {
			content: '',
			keyword: '',
		},

		validate: {
			content: (value) => value.length > 0 ? null : 'Content is required',
			keyword: (value) => value.length > 0 ? null : 'Keyword is required'
		},
	});

	const [opened, setOpened] = useState(false);

	const component = (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			title="Update Comment"
		>
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
				<Textarea
					required
					label="Content"
					{...form.getInputProps('content')}
				/>

				<TextInput
					required
					label="Keyword"
					placeholder="abc,def,ghi"
					{...form.getInputProps('keyword')}
				/>

				<Group position="right" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Modal>
	)
	return {
		component,
		setOpened
	};
}