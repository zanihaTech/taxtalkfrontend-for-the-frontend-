import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';  // Adjust path to your AdminDashboard component
import '@testing-library/jest-dom/extend-expect';
import { server } from './mocks/server';  // For mocking API responses
import { rest } from 'msw';

describe('Admin Dashboard Tests', () => {

  // 1. Render Test - Ensure Admin Dashboard loads properly
  test('renders Admin Dashboard', () => {
    render(<AdminDashboard />);

    // Ensure the key elements are rendered
    expect(screen.getByText(/User List/i)).toBeInTheDocument();
    expect(screen.getByText(/Task Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });

  // 2. Test - "Add Task" button opens modal
  test('clicking "Add Task" button opens task creation modal', async () => {
    render(<AdminDashboard />);

    // Simulate click on the Add Task button
    fireEvent.click(screen.getByText(/Add Task/i));

    // Ensure the modal appears
    expect(await screen.findByText(/Create a New Task/i)).toBeInTheDocument();
  });

  // 3. Test - API call for fetching users
  test('fetches and displays user data from API', async () => {
    render(<AdminDashboard />);

    // Mock the API response for users
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ users: [{ name: 'John Doe' }, { name: 'Jane Smith' }] })
        );
      })
    );

    // Wait for the users to be fetched and rendered
    await waitFor(() => expect(screen.getByText(/John Doe/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument());
  });

  // 4. Test - Button Click to toggle user status
  test('clicking toggle button changes user status', () => {
    render(<AdminDashboard />);

    // Simulate clicking the toggle button
    const toggleButton = screen.getByText(/Toggle Status/i);
    fireEvent.click(toggleButton);

    // Ensure the status changes (this will depend on your app logic)
    expect(screen.getByText(/Status: Active/i)).toBeInTheDocument();
  });

  // 5. Test - Form Submission for adding a new task
  test('submit new task form', async () => {
    render(<AdminDashboard />);

    // Open the task creation modal
    fireEvent.click(screen.getByText(/Add Task/i));

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/Task Description/i), { target: { value: 'This is a test task.' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i));

    // Ensure the new task appears in the list
    expect(await screen.findByText(/New Task/i)).toBeInTheDocument();
  });

  // 6. Test - Check for user profile display when logged in
  test('renders user profile when logged in', () => {
    render(<AdminDashboard user={{ loggedIn: true, name: 'Admin' }} />);

    // Ensure the user's profile is displayed
    expect(screen.getByText(/Hello, Admin/i)).toBeInTheDocument();
  });

  // 7. Test - Handles "Like" button click
  test('handles "Like" button click', async () => {
    render(<AdminDashboard />);

    // Find and click the "Like" button
    fireEvent.click(screen.getByText(/Like \(5\)/i));

    // Check if the "Like" count increases (this depends on the state change logic)
    expect(screen.getByText(/Like \(6\)/i)).toBeInTheDocument();
  });

  // 8. Test - Check Conditional Rendering for Empty List
  test('displays a message if there are no tasks', () => {
    render(<AdminDashboard />);

    // Check for a message when the task list is empty
    expect(screen.getByText(/No tasks available/i)).toBeInTheDocument();
  });

  // 9. Clean Up After Each Test
  afterEach(() => {
    jest.clearAllMocks();
  });

});
