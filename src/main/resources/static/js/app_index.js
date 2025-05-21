document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginData = {
        userid: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
    localStorage.setItem("loginUser", data.userid);
    localStorage.setItem("loginRole", data.role); // ✅ 追加！
    window.location.href = "main.html";
    })
    .catch(error => {
        console.error('エラー:', error);
        document.getElementById('errorMessage').textContent = "サーバーエラーが発生しました。";
    });
});


