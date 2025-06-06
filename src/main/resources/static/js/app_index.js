document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    userid: document.getElementById('username').value,
    password: document.getElementById('password').value
  };

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(async res => {
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || 'ログイン失敗');
    }
    return res.json();
  })
  .then(user => {
    // ユーザ情報をローカルに保存（権限チェック用）
    localStorage.setItem('loginUser', user.userid);
    localStorage.setItem('loginRole', user.role);
    window.location.href = 'project_list.html';
  })
  .catch(err => {
    document.getElementById('error-message').textContent = err.message;
  });
});



