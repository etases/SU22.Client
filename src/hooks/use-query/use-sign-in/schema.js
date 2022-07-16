import { z } from 'zod'
import { PASSWORD_FULL_STRENGTH_REGEX } from '~/core/configurations'

const modelArr = ['username', 'password']

export const model = modelArr.reduce(
    (acc, key) => ({
        ...acc,
        [key]: key,
    }),
    {}
)

export const schema = z.object({
    [model.username]: z
        .string()
        .min(6, {
            message: 'Username must be at least 6 characters long',
        })
        .max(20, {
            message: 'Username must be at most 20 characters long',
        }),
    [model.password]: z.string().regex(PASSWORD_FULL_STRENGTH_REGEX, {
        message:
            'Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter',
    }),
})
