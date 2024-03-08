import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

//Mock timers before running the tests
jest.useFakeTimers();

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

afterAll(() => {
  jest.useRealTimers(); // Restore real timers
});
