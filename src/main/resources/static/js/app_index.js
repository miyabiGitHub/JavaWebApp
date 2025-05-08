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


//document.getElementById("loginButton").addEventListener("click", function(myevent){
//    myevent.preventDefault();
//    mainPage();
//});

//function mainPage(){
//    location.href="main.html"
//}

