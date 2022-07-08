import { useQuery } from 'react-query'
import { fetchApi } from '../functions'

const initialData = (noOfItems) =>
  Array.from(new Array(noOfItems), (val, key) => key + 1).map((item) => ({
    id: item,
    title: `Title ${item}`,
    data: `Data ${item}`,
    author: `Author ${item}`,
  }))

export function useHomeQuery(props) {
  const { currentPage } = props
  const queryResult = useQuery({
    queryKey: ['home', currentPage],
    // initialData: initialData(10),
    placeholderData: initialData(10),
    queryFn: async () =>
      fetchApi({
        baseUrl: {
          protocol: 'https://',
          host: 'jsonplaceholder.typicode.com',
          port: '',
        },
        method: 'GET',
        endpoint: '/posts',
        query: {
          _page: currentPage,
          _limit: 10,
        },
      }),
    select: (data) => {
      return data.map((item) => ({
        id: item.id,
        title: item.title,
        data: item.body,
        author: item.userId,
      }))
    },
    onError: (error) => {},
    onSuccess: (data) => {},
  })

  return queryResult
}
