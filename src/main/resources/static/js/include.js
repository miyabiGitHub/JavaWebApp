document.addEventListener("DOMContentLoaded", async () => {
  // ヘッダーとサイドバーを読み込む
  await Promise.all([
    fetch("header.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("header-area").innerHTML = html;
      }),
    fetch("sidebar.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("sidebar-area").innerHTML = html;
      })
  ]);

  // 👇 ログインユーザー表示処理はここで確実に呼ぶ
  const user = localStorage.getItem("loginUser") || "未ログイン";
  document.querySelector("#login-user").textContent = `ログイン中: ${user}`;

  // 👇 権限制御
  const role = localStorage.getItem("loginRole");
  if (role === "users") {
    const employeeMenu = document.getElementById("menu-employee");
    const userMenu = document.getElementById("menu-user");
    if (employeeMenu) employeeMenu.style.display = "none";
    if (userMenu) userMenu.style.display = "none";
  }

        if (role === "users") {
            document.getElementById("menu-employee").style.display = "none";
            document.getElementById("menu-user").style.display = "none";
            document.getElementById("manager").style.display = "none";
            document.getElementById("admin").style.display = "none";
        }

        if (role === "manager") {
            document.getElementById("pending").style.display = "none";
            document.getElementById("admin").style.display = "none";
        }

        if (role === "admin") {
            document.getElementById("manager").style.display = "none";
            document.getElementById("pending").style.display = "none";
        }        
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

function toggleSubMenu4() {
    const submenu4 = document.getElementById('submenu4');
    if (submenu4.style.display === 'none') {
        submenu4.style.display = 'block';
    } else {
        submenu4.style.display = 'none';
    }
}