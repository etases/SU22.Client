import { Button, Grid, TextInput } from '@mantine/core'
import { useTranslation } from '~/hooks'
import { useSignInForm, useSignInSubmit } from '~/hooks/use-query'

const { Col } = Grid

export function SignIn() {
	const { onSubmit, getInputProps, model } = useSignInForm()
	const { mutate } = useSignInSubmit()
	const translate = useTranslation({
		getTranslatorOnly: true,
	})

	return (
		<Grid>
			<form onSubmit={onSubmit(mutate)}>
				<Grid>
					<Col span={12}>
						<TextInput
							type={'text'}
							required={true}
							label={'User name'}
							placeholder={'Enter your user name'}
							{...getInputProps(model.username)}
						/>
					</Col>
					<Col span={12}>
						<TextInput
							type={'password'}
							required={true}
							label={'Password'}
							placeholder={'Enter your password'}
							{...getInputProps(model.password)}
						/>
					</Col>
					<Col span={12}>
						<Button
							type={'submit'}
							fullWidth>
							{translate({
								key: 'auth.login',
							})}
						</Button>
					</Col>
				</Grid>
			</form>
		</Grid>
	)
}
