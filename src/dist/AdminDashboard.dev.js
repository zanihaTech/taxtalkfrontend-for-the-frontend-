"use strict";

var handleCreatePost = function handleCreatePost() {
  var formData, response, errorMessage;
  return regeneratorRuntime.async(function handleCreatePost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          formData = new FormData();
          formData.append('title', newPost.title);
          formData.append('content', newPost.content);
          formData.append('imageFile', imagePreviewFile);
          console.log('Creating Post with Data:', formData);
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(fetch('http://localhost:5000/api/posts/create', {
            method: 'POST',
            body: formData
          }));

        case 8:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 18;
            break;
          }

          console.log('Post created successfully');
          fetchPosts();
          alert('Post created successfully!');
          setShowCreatePost(false);
          setNewPost({
            title: '',
            content: '',
            image: ''
          });
          setImagePreview('');
          _context.next = 23;
          break;

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(response.text());

        case 20:
          errorMessage = _context.sent;
          console.error('Failed to create post:', errorMessage);
          alert('Failed to create post.');

        case 23:
          _context.next = 28;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](5);
          console.error('Error creating post:', _context.t0);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 25]]);
};
//# sourceMappingURL=AdminDashboard.dev.js.map
