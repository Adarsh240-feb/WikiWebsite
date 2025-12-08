import React from 'react';
import { render, screen } from '@testing-library/react';
import QueryForm from '../components/QueryForm';

describe('QueryForm', () => {
  it('renders the form and submit button', () => {
    render(<QueryForm />);
    const button = screen.getByRole('button', { name: /submit query/i });
    expect(button).toBeInTheDocument();
  });
});
