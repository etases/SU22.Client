import { z } from 'zod'

const modelArr = ['categoryId', 'keyword']

export const model = modelArr.reduce(
	(acc, key) => ({
		...acc,
		[key]: key,
	}),
	{}
)

export const schema = z.object({
	[model.categoryId]: z.string(),
	[model.keyword]: z.string().isOptional(),
})
