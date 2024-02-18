import { Button, TextInput } from '@mantine/core'
import React from 'react'

const Searchbar = () => {
  return (
    <>
    <div className='border rounded'>
        <div className='flex'>
        <TextInput placeholder='Enter Address here'/>
        <Button variant='filled' color='lime'>Search</Button>
        </div>
    </div>
    </>
  )
}

export default Searchbar