import { PASSWORD_FULL_STRENGTH_REGEX } from '~/core/configurations'

const modelArr = ['username', 'password', 'passwordConfirmation']

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
}
