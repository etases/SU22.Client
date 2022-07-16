import { Button, Grid, Stack, TextInput } from '@mantine/core'
import { useTranslation } from '~/hooks'
import { useSignUpForm, useSignUpSubmit } from '~/hooks/use-query'

export function SignUp() {
	const { onSubmit, getInputProps, model } = useSignUpForm()
	const { mutate } = useSignUpSubmit()
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

					<TextInput
						type={'password'}
						required={true}
						label={'Confirm password'}
						placeholder={'Enter your password'}
						{...getInputProps(model.passwordConfirmation)}
					/>
					<Button type={'submit'}>
						{translate({
							key: 'auth.register',
						})}
					</Button>
				</Stack>
			</form>
		</Grid>
	)
}
