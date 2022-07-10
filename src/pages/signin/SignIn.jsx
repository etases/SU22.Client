import { useQuery } from 'react-query'
import { fetchApi } from '~/hooks'

export function SignIn() {
  const { data } = useQuery({
    queryKey: ['signin'],
    queryFn: async () =>
      fetchApi({
        method: 'POST',
        body: {
          userName: 'test',
          password: 'test123',
        },
        endpoint: 'account/login',
      }),
    onSuccess: (data) => {
      console.log('success', data)
    },
  })
  return (
    <div>
      <h1>Sign In</h1>
      <h1>{}</h1>
    </div>
  )
}
