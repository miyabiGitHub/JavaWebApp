document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginData = {
        userid: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            // ログイン成功
            window.location.href = "main.html";
            // ログイン成功時に保存！
            localStorage.setItem("loginUser", loginData.userid);  
        } else {
            // ログイン失敗
            document.getElementById('errorMessage').textContent = "ログインに失敗しました。";
        }
    })
    .catch(error => {
        console.error('エラー:', error);
        document.getElementById('errorMessage').textContent = "サーバーエラーが発生しました。";
    });
});


