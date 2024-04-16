'use client'
import React, { useEffect, useState } from 'react'
type Props = {}

const ClientComponent = (props: Props) => {
  // Define the URL of the JSONPlaceholder API endpoint
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts'
  const [data, setData] = useState<any>(null)
  // Fetch data from the API
  const handleFetchApi = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Data is the array of posts
        setData(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }
  useEffect(() => {
    handleFetchApi()
  }, [])
  return <div>{JSON.stringify(data)}</div>
}

export default ClientComponent
