async function test() {
  try {
    const loginRes = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'employer@gmail.com', password: 'password123' })
    });
    
    if (!loginRes.ok) {
        console.log("Login failed", await loginRes.json());
        return;
    }
    const data = await loginRes.json();
    console.log('Login successful. Role:', data.data.user.role);
    
    const cookies = loginRes.headers.get('set-cookie');
    
    const patchRes = await fetch('http://localhost:5000/api/v1/employers/profile', {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': cookies || ''
      },
      body: JSON.stringify({ name: 'Navin Kannan', phone: '1234567890' })
    });
    
    console.log('Patch status:', patchRes.status);
    console.log('Patch response:', await patchRes.json());
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
