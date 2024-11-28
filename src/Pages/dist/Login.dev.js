"use strict";

var login = function login(username, password) {
  var response, data;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              password: password
            }) // Send username and password as JSON

          }));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;

          if (!response.ok) {
            _context.next = 13;
            break;
          }

          // If login is successful
          localStorage.setItem("token", data.token); // Store the token in local storage

          console.log("Login successful:", data.token);
          return _context.abrupt("return", data.token);

        case 13:
          // If login fails, handle the error
          console.error("Login failed:", data.message);
          alert("Login failed: ".concat(data.message)); // Optional: Show an alert for better UX

          return _context.abrupt("return", null);

        case 16:
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          // Catch any unexpected errors (e.g., network issues)
          console.error("An error occurred:", _context.t0);
          alert("An error occurred during login. Please try again."); // Optional: Show alert

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
};
//# sourceMappingURL=Login.dev.js.map
