// ✅ ページロード時に一覧を取得
document.addEventListener('DOMContentLoaded', loadUsers);

function loadUsers() {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const list = document.getElementById('user-list');
            list.innerHTML = ''; // クリア

            users.forEach(user => {
                const row = `
                  <tr>
                    <td>${user.userid}</td>
                    <td>${user.role}</td>
                    <td>
                        <button onclick="editUser('${user.userid}')">編集</button>
                        <button onclick="deleteUser('${user.userid}')">削除</button>
                    </td>
                  </tr>
                `;
                list.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => {
            console.error('ユーザ一覧取得エラー:', error);
        });
}

function editUser(userid) {
    // ✅ users.htmlにパラメータ付きで遷移
    window.location.href = `users.html?userid=${userid}`;
}
  
    function toggleSubMenu1() {
      const submenu1 = document.getElementById('submenu1');
      if (submenu1.style.display === 'none') {
          submenu1.style.display = 'block';
      } else {
          submenu1.style.display = 'none';
      }
  }

function deleteUser(userid) {
    if (!confirm(`ユーザ「${userid}」を削除しますか？`)) return;

    fetch(`/users/${userid}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('削除に失敗しました');
        }
        return response.text();
    })
    .then(data => {
        alert('✅ ' + data);
        loadUsers(); // 削除後、再読み込み
    })
    .catch(error => {
        alert('❌ エラー: ' + error);
    });
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