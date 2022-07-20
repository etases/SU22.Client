import { Button, Grid, TextInput } from '@mantine/core'
import { useTranslation } from '~/hooks'
import { useSignUpForm, useSignUpSubmit } from '~/hooks/use-query'

const { Col } = Grid

export function SignUp() {
	const { onSubmit, getInputProps, model } = useSignUpForm()
	const { mutate } = useSignUpSubmit()
	const translate = useTranslation({
		getTranslatorOnly: true,
	})

	return (
		<Grid>
			<form onSubmit={onSubmit(mutate)}>
				<Grid>
					<Col>
						<TextInput
							type={'text'}
							required={true}
							label={'User name'}
							placeholder={'Enter your user name'}
							{...getInputProps(model.username)}
						/>
					</Col>
					<Col span={6}>
						<TextInput
							type={'text'}
							required={true}
							label={'First name'}
							placeholder={'Enter your first name'}
							{...getInputProps(model.firstName)}
						/>
					</Col>
					<Col span={6}>
						<TextInput
							type={'text'}
							required={true}
							label={'Last name'}
							placeholder={'Enter your last name'}
							{...getInputProps(model.lastName)}
						/>
					</Col>
					<Col>
						<TextInput
							type={'text'}
							required={true}
							label={'Address'}
							placeholder={'Enter your address'}
							{...getInputProps(model.address)}
						/>
					</Col>
					<Col span={6}>
						<TextInput
							type={'password'}
							required={true}
							label={'Password'}
							placeholder={'Enter your password'}
							{...getInputProps(model.password)}
						/>
					</Col>
					<Col span={6}>
						<TextInput
							type={'password'}
							required={true}
							label={'Confirm password'}
							placeholder={'Enter your password'}
							{...getInputProps(model.passwordConfirmation)}
						/>
					</Col>
					<Col>
						<Button
							type={'submit'}
							fullWidth>
							{translate({
								key: 'auth.register',
							})}
						</Button>
					</Col>
				</Grid>
			</form>
		</Grid>
	)
}
