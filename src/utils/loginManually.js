// src/utils/loginManually.js

export async function loginManually() {
    try {
      // Replace with your actual login credentials or logic
      const credentials = {
        username: 'appu.vinayak@pumexinfotech.com',
        password: 'lohpausqdjksjzwg',
      };
  
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem('token', data.token);  // Save token for future requests
        return data.token;
      } else {
        throw new Error('No token returned from login');
      }
    } catch (err) {
      console.error('loginManually error:', err);
      return null;
    }
  }
  