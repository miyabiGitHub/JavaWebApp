document.getElementById('usersForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const userData = {
    userid: document.getElementById('userid').value,
    password: document.getElementById('password').value,
    role: document.getElementById('role').value
  };

  const params = new URLSearchParams(window.location.search);
  const useridParam = params.get('userid');

  let url = '/users';
  let method = 'POST';

  if (useridParam) {
      // ✅ 編集の場合はPUTで更新
      url = `/users/${useridParam}`;
      method = 'PUT';
  }

  fetch(url, {
    method: method,
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
    window.location.href = "users_list.html";  // ✅ 戻る
  })
  .catch(error => {
    alert('登録失敗: ' + error);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // ✅ URLパラメータを取得
  const params = new URLSearchParams(window.location.search);
  const userid = params.get('userid');

  if (userid) {
      // ✅ ユーザ情報をサーバから取得
      fetch(`/users/${userid}`)
          .then(response => response.json())
          .then(user => {
              // ✅ フォームに値をセット
              document.getElementById('userid').value = user.userid;
              document.getElementById('password').value = user.password;
              document.getElementById('role').value = user.role;
          })
          .catch(error => {
              console.error('ユーザ取得エラー:', error);
          });
  }
});
  
  function toggleSubMenu1() {
    const submenu1 = document.getElementById('submenu1');
    if (submenu1.style.display === 'none') {
        submenu1.style.display = 'block';
    } else {
        submenu1.style.display = 'none';
    }
}

function toggleSubMenu2() {
    const submenu2 = document.getElementById('submenu2');
    if (submenu2.style.display === 'none') {
        submenu2.style.display = 'block';
    } else {
        submenu2.style.display = 'none';
    }
}

function toggleSubMenu3() {
    const submenu3 = document.getElementById('submenu3');
    if (submenu3.style.display === 'none') {
        submenu3.style.display = 'block';
    } else {
        submenu3.style.display = 'none';
    }
}

function toggleSubMenu4() {
  const submenu4 = document.getElementById('submenu4');
  if (submenu4.style.display === 'none') {
      submenu4.style.display = 'block';
  } else {
      submenu4.style.display = 'none';
  }
}