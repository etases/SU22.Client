import { Button, Grid, Stack, TextInput } from '@mantine/core'
import { useTranslation } from '~/hooks'
import { useSignInForm, useSignInSubmit } from '~/hooks/use-query'

export function SignIn() {
	const { onSubmit, getInputProps, model } = useSignInForm()
	const { mutate } = useSignInSubmit()
	const translate = useTranslation({
		getTranslatorOnly: true,
	})

	return (
		<Grid>
			<form onSubmit={onSubmit(mutate)}>
				<Stack>
					<TextInput
						type={'text'}
						required={true}
						label={'User name'}
						placeholder={'Enter your user name'}
						{...getInputProps(model.username)}
					/>
					<TextInput
						type={'password'}
						required={true}
						label={'Password'}
						placeholder={'Enter your password'}
						{...getInputProps(model.password)}
					/>
					<Button type={'submit'}>
						{translate({
							key: 'auth.login',
						})}
					</Button>
				</Stack>
			</form>
		</Grid>
	)
}
