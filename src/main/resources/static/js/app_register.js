document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 入力値を取得
    const data = {
        title: document.getElementById('title').value,
        customer: document.getElementById('customer').value,
        description: document.getElementById('description').value,
        syain: document.getElementById('syain').value,
        eigyo: document.getElementById('eigyo').value,
        type: document.getElementById('type').value
    };

    console.log('送信データ:', data);

    // 仮のPOST送信 (バックエンドに合わせてURL変更)
    fetch('/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('案件が登録されました！');
            document.getElementById('registerForm').reset();
        } else {
            alert('登録に失敗しました。');
        }
    })
    .catch(error => {
        console.error('エラー:', error);
        alert('通信エラーが発生しました。');
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