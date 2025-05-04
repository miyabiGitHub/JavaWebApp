document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const userData = {
      userid: document.getElementById('userid').value,
      password: document.getElementById('password').value,
      role: document.getElementById('role').value
    };
  
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('エラーが発生しました');
      }
      return response.text();
    })
    .then(data => {
      alert('登録成功: ' + data);
    })
    .catch(error => {
      alert('登録失敗: ' + error);
    });
  });
  