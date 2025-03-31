document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("errorMessage");

        // 🔹 ログインAPIのエンドポイントを `/login` に変更
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        // 🔹 サーバーからのレスポンスをJSONとして取得
        const data = await response.json();

        // 🔹 レスポンスの結果に応じて処理を分岐
        if (response.ok && data.success) {
            alert("ログイン成功！");
            window.location.href = "main.html"; // メイン画面へ遷移
        } else {
            errorMessage.textContent = data.error || "ログインに失敗しました。";
        }
    });
});
