// Create middlewares required for routes defined in app.js
// export const register = async (req, res) => {};

// You can also create helper functions in this file to help you implement logic inside middlewares

export const usersDatabase = [];

export function addUser(username, password) {
  usersDatabase.push({ username, password });
}
