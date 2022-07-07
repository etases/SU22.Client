import { Grid, Title } from '@mantine/core'
import { useQuery } from 'react-query'

export function Home() {
  const { data, isLoading, fetchStatus } = useQuery(['home'], {
    queryFn: async () => {
      const response = await fetch('/metadata/settigs?id=2', {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    },
    onSuccess: (data) => {
      console.log('response', data)
    },
  })

  return (
    <Grid>
      <Title order={1}>Home</Title>
      <Title order={1}>
        {isLoading ? 'Loading...' : data.request?.originalUrl}
      </Title>
    </Grid>
  )
}
