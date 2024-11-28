// Import necessary modules for testing
import { render, screen } from '@testing-library/react';
import App from './App';  // Import your App component to test it

// Test case
test('renders Explore Blogs button', () => {
  render(<App />); // Render the App component

  // Get the button by its test ID
  const buttonElement = screen.getByTestId('explore-blogs-button');

  // Assert that the button is in the document
  expect(buttonElement).toBeInTheDocument();
});
