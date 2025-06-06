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