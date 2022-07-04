import { Grid } from '@mantine/core'
import { Outlet, useParams } from 'react-router-dom'

const { Col } = Grid

export function Category() {
  const { category } = useParams()
  return (
    <Grid grow={true}>
      <Col span={6}>{category}</Col>
      <Col span={6}>
        <Outlet />
      </Col>
    </Grid>
  )
}
