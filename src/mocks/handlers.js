// src/mocks/handlers.js
import { rest } from 'msw';

// Define your mock handlers here
export const handlers = [
  rest.get('https://example.com/api/posts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        posts: [
          { id: 1, title: 'Sample Post 1', content: 'Content for post 1' },
          { id: 2, title: 'Sample Post 2', content: 'Content for post 2' },
        ],
      })
    );
  }),
  
  // Add more handlers as needed (POST, PUT, DELETE, etc.)
];
