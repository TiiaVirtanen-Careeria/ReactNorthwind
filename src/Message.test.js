import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Message from './Message.jsx'

test('Message komponentin testaus', () => {
  
  const message = 'Testi tekstiä..'

  render(<Message message={message} />)

  const element = screen.getByText('Testi tekstiä..')
  expect(element).toBeDefined()
})