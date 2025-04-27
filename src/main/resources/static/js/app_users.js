document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 画面遷移を止める！

        const data = {
            userid: document.getElementById('userid').value,
            password: document.getElementById('password').value,
            role: document.getElementById('role').value
        };

        fetch('/users', { // 👈 ここで直接Javaに渡す
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('登録成功！');
            } else {
                alert('登録失敗...');
            }
        })
        .catch(error => {
            console.error('エラー:', error);
            alert('通信エラー');
        });
    });
});
