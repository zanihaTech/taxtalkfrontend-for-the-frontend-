// src/components/BlogList/BlogList.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BlogList from './BlogList';  // Adjust the import path as necessary
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the fetch call before the test runs
beforeAll(() => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce([
      { id: 1, title: 'Sample Post', content: 'This is a sample post.', likes: 5 },
    ]),
  });
});

afterAll(() => {
  global.fetch.mockClear();
});

describe('BlogList Component', () => {
  // Test to ensure the blog posts render correctly
  test('renders blog posts correctly', async () => {
    render(
      <Router>
        <BlogList />
      </Router>
    );

    // Wait for the blog post to appear on the screen
    const titleElement = await screen.findByText('Sample Post');

    // Assert that the title is in the document
    expect(titleElement).toBeInTheDocument();
  });

  // Test to simulate the "Like" button click and check if it updates
  test('handles "Like" button click', async () => {
    render(
      <Router>
        <BlogList />
      </Router>
    );

    // Wait for the post to appear
    const titleElement = await screen.findByText('Sample Post');
    expect(titleElement).toBeInTheDocument();

    // Find and click the "Like" button
    const likeButton = screen.getByText(/Like \(5\)/i);
    fireEvent.click(likeButton);

    // Ensure the like count is updated to 6
    expect(screen.getByText(/Like \(6\)/i)).toBeInTheDocument();
  });

  // Test to simulate the "Read More" button click
  test('handles "Read More" button click', async () => {
    render(
      <Router>
        <BlogList />
      </Router>
    );

    // Wait for the post to appear
    const titleElement = await screen.findByText('Sample Post');
    expect(titleElement).toBeInTheDocument();

    // Find and click the "Read More" button
    const readMoreButton = screen.getByText(/Read More/i);
    fireEvent.click(readMoreButton);

    // Assert that the content of the post is revealed
    expect(screen.getByText(/This is a sample post./i)).toBeInTheDocument();
  });

  // Test to toggle the share dropdown visibility
  test('toggles share dropdown visibility', async () => {
    render(
      <Router>
        <BlogList />
      </Router>
    );

    // Wait for the post to appear
    const titleElement = await screen.findByText('Sample Post');
    expect(titleElement).toBeInTheDocument();

    // Find and click the "Share" button
    const shareButton = screen.getByText(/Share/i);
    fireEvent.click(shareButton);

    // Assert that the share dropdown appears
    expect(screen.getByText(/Share on Facebook/i)).toBeInTheDocument();  // Adjust this as per your dropdown options
  });
});
