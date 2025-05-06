// ✅ メニューのサブ展開
function toggleSubMenu1() {
    let submenu = document.getElementById('submenu1');
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
  }
  function toggleSubMenu2() {
    let submenu = document.getElementById('submenu2');
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
  }
  function toggleSubMenu3() {
    let submenu = document.getElementById('submenu3');
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
  }
  
  function logout() {
    alert("ログアウトしました");
    window.location.href = "index.html";
  }
  
  // ✅ フォーム送信処理
  document.getElementById('employeeForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const empData = {
      empid: document.getElementById('empid').value,
      empname: document.getElementById('empname').value,
      department: document.getElementById('department').value
    };
  
    // 仮: POST送信 (サーバ側にエンドポイント作る必要あり)
    fetch('/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empData)
    })
    .then(response => {
      if (!response.ok) throw new Error('登録失敗');
      return response.text();
    })
    .then(data => {
      document.getElementById('result').textContent = data;
    })
    .catch(error => {
      document.getElementById('result').textContent = 'エラーが発生しました';
      console.error(error);
    });
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

function logout() {
    window.location.href = "index.html";
}