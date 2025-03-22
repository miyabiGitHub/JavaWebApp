document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.text();

        if (response.ok) {
            alert("ログイン成功！");
            window.location.href = "main.html"; // メイン画面へ遷移
        } else {
            document.getElementById("errorMessage").textContent = "ログインに失敗しました。";
        }
    });
});
