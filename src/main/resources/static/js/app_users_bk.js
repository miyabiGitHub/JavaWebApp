function registerUser() {
    const userid = document.getElementById('userid').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const userData = {
        userid: userid,
        password: password,
        role: role
    };

    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            alert('登録成功！');
        } else {
            alert('登録失敗...');
        }
    })
    .catch(error => {
        console.error('送信エラー:', error);
    });
}
