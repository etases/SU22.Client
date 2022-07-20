import { PASSWORD_FULL_STRENGTH_REGEX } from '~/core/configurations'

const modelArr = [
	'username',
	'password',
	'passwordConfirmation',
	'firstName',
	'lastName',
	'address',
]

export const model = modelArr.reduce(
	(acc, key) => ({
		...acc,
		[key]: key,
	}),
	{}
)

export const schema = {
	[model.username]: (value) =>
		value.length >= 6 && value.length <= 20
			? null
			: 'Username must be between 6-20 characters long',
	[model.password]: (value) =>
		PASSWORD_FULL_STRENGTH_REGEX.test(value)
			? null
			: 'Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter',
	[model.passwordConfirmation]: (value, values) =>
		value === values.password
			? null
			: 'Password confirmation must match password',
	[model.firstName]: (value) =>
		value.length >= 2
			? null
			: 'First name must be at least 2 characters long',
	[model.lastName]: (value) =>
		value.length >= 2
			? null
			: 'Last name must be at least 2 characters long',
	[model.address]: (value) =>
		value.length >= 10
			? null
			: 'Address must be at least 2 characters long',
}
