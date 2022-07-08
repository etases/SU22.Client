import { Button, Card, Grid, Input, Pagination, Title } from '@mantine/core'
import { useState } from 'react'
import { useHomeQuery, useUpdatePost } from '~/hooks'

const { Col } = Grid

export function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [form, setForm] = useState({
    title: '',
    postId: -1,
  })
  const { data, isLoading } = useHomeQuery({
    currentPage,
  })

  const { mutate } = useUpdatePost({
    currentPage,
  })

  return (
    <Grid>
      <Col span={12}>
        <Input
          value={form.postId}
          onChange={({ target }) => {
            setForm((prevData) => ({
              ...prevData,
              postId: target.value,
            }))
          }}
          placeholder="Post ID"
        />
        <Input
          placeholder="Post title"
          value={form.title}
          onChange={({ target }) => {
            setForm((prevData) => ({
              ...prevData,
              title: target.value,
            }))
          }}
        />
        <Button
          onClick={() =>
            mutate({
              id: form.postId,
              body: { title: form.title },
            })
          }>
          Update
        </Button>
      </Col>
      <Col span={12}>
        {data.map((item) => (
          <Card key={item.id}>
            <Grid>
              <Col span={4}>
                <Title>{item.id}</Title>
              </Col>
              <Col span={8}>
                <Title>{item.title}</Title>
              </Col>
            </Grid>
          </Card>
        ))}
      </Col>
      <Col span={12}>
        <Pagination
          total={10}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </Col>
    </Grid>
  )
}
