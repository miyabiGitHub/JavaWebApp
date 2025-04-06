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
    if (["案件情報一覧", "申請待ち", "承認済み", "差し戻し"].includes(menu)) {
        contentArea.innerHTML = `
            <ul id="data-list">
                <li>案件1: システム開発</li>
                <li>案件2: ウェブサイト制作</li>
                <li>案件3: モバイルアプリ開発</li>
            </ul>
        `;
    } else if (menu === "社員情報") {
        contentArea.innerHTML = `<p>社員情報を登録するフォーム（仮）</p>`;
    } else if (menu === "ユーザ情報") {
        contentArea.innerHTML = `<p>ユーザ情報を登録するフォーム（仮）</p>`;
    } else if (menu === "案件新規登録") {
        contentArea.innerHTML= `
            <p>ユーザ情報を登録するフォーム（仮）</p>
        `;
    }
}

function toggleSubMenu() {
    const submenu = document.getElementById('submenu');
    if (submenu.style.display === 'none') {
        submenu.style.display = 'block';
    } else {
        submenu.style.display = 'none';
    }
}


function logout() {
    window.location.href = "index.html";
}
