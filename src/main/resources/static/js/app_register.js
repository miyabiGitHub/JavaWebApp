document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
      title: document.querySelector('input[name="title"]').value,
      customer: document.querySelector('input[name="customer"]').value,
      description: document.querySelector('input[name="description"]').value,
      syain: document.querySelector('input[name="syain"]').value,
      eigyo: document.querySelector('select[name="eigyo"]').value,
      type: document.querySelector('select[name="type"]').value
    };

    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error('エラー');
      return response.text();
    })
    .then(data => alert('登録成功: ' + data))
    .catch(error => alert('登録失敗: ' + error));
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