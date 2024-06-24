/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Select } from '@mantine/core'
import { LineChart } from '@mantine/charts'
import '@mantine/charts/styles.css'
import { Post } from '../../interface/Posts/post.type'

interface Props {
  posts: Post[]
}

const filterDataByDays = (data: Post[], days: number) => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - (days - 1))
  startDate.setHours(0, 0, 0, 0)
  return data.filter((item) => {
    const itemDate = new Date(item.created_at)
    return itemDate >= startDate
  })
}
const aggregateDataByDate = (data: Post[]) => {
  const aggregatedData: { [key: string]: number } = {}
  data.forEach((item) => {
    const date = new Date(item.created_at).toISOString().split('T')[0]
    if (!aggregatedData[date]) {
      aggregatedData[date] = 0
    }
    aggregatedData[date] += 1
  })
  const result = Object.keys(aggregatedData).map((date) => ({
    date,
    posts: aggregatedData[date]
  }))
  result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return result
}
const PostStatistics = ({ posts }: Props) => {
  const [filter, setFilter] = useState('7days')

  const handleFilterChange = (value: any) => {
    setFilter(value)
  }

  const getFilteredData = () => {
    switch (filter) {
      case '7days':
        return filterDataByDays(posts, 7)
      case '30days':
        return filterDataByDays(posts, 30)
      case '90days':
        return filterDataByDays(posts, 90)
      default:
        return posts
    }
  }
  const filteredData = aggregateDataByDate(getFilteredData())

  return (
    <div>
      <Select
        label='Filter by'
        placeholder='Pick one'
        value={filter}
        onChange={handleFilterChange}
        data={[
          { value: '7days', label: 'Last 7 days' },
          { value: '30days', label: 'Last 30 days' },
          { value: '90days', label: 'Last 90 days' }
        ]}
        mb='md'
      />
      <LineChart
        h={300}
        data={filteredData}
        dataKey='date'
        series={[{ name: 'posts', color: 'indigo.6' }]}
      />
    </div>
  )
}

export default PostStatistics
