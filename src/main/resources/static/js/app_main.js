document.addEventListener("DOMContentLoaded", () => {
    showContent("案件情報一覧");
});

function showContent(menu) {
    const title = document.getElementById("title");
    const contentArea = document.getElementById("content-area");

    title.textContent = menu;

    if (menu==="案件新規登録") {
        fetch('register.html')
        .then(response => response.text())
        .then(html => {
            contentArea.innerHTML = html;  // ← innerHTMLで埋め込む
        })
        .catch(error => {
            console.error('読み込みエラー:', error);
            contentArea.innerHTML = '<p>登録画面の読み込みに失敗しました。</p>';
        });
    }
    if (menu === "ユーザ情報登録") {
        fetch('users.html')
        .then(response => response.text())
        .then(html => {
            contentArea.innerHTML = html;  // ← innerHTMLで埋め込む
        })
        .catch(error => {
            console.error('読み込みエラー:', error);
            contentArea.innerHTML = '<p>登録画面の読み込みに失敗しました。</p>';
        });       
    }
    if (menu === "社員情報登録") {
        fetch('employee.html')
        .then(response => response.text())
        .then(html => {
            contentArea.innerHTML = html;  // ← innerHTMLで埋め込む
        })
        .catch(error => {
            console.error('読み込みエラー:', error);
            contentArea.innerHTML = '<p>登録画面の読み込みに失敗しました。</p>';
        });
    }
    if (["案件情報一覧", "申請待ち", "承認済み", "差し戻し"].includes(menu)) {
        contentArea.innerHTML = `
            <ul id="data-list">
                <li>案件1: システム開発</li>
                <li>案件2: ウェブサイト制作</li>
                <li>案件3: モバイルアプリ開発</li>
            </ul>
        `;
    } else if (menu === "社員情報一覧"){
        contentArea.innerHTML = `<p>社員情報のリスト（仮）</p>`;
    } else if (menu === "ユーザ情報一覧"){
        contentArea.innerHTML = `<p>ユーザ情報のリスト（仮）</p>`;
    }
}

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
