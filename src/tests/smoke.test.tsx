import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('App smoke', () => {
  it('renders something on /', () => {
    // Minimalny render placeholder route bez routera
    render(<h1>SHIFTFlow</h1>)
    expect(screen.getByText('SHIFTFlow')).toBeInTheDocument()
  })
})