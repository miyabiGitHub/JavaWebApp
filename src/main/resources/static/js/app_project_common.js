function loadProjectsByStatus(status, mode) {
  fetch(`/projects/${status}`)
    .then(res => res.json())
    .then(projects => {
      const list = document.getElementById("project-list");
      list.innerHTML = "";

      projects.forEach(p => {
        const row = `
          <tr>
            <td>${p.title}</td>
            <td>${p.customer}</td>
            <td>${p.amount}</td>
            <td>${p.member}</td>
            <td>${p.sales}</td>
            <td>${p.type}</td>
            <td>${p.deadline}</td>
            <td>${p.status}</td>
            <td>${renderButtons(p, mode)}</td>
          </tr>`;
        list.insertAdjacentHTML("beforeend", row);
      });
    });
}

// 🎯 ボタン生成
function renderButtons(p, mode) {
  const id = p.id;
  const role = localStorage.getItem("loginRole");
  let html = "";

  if (mode === "manager" && role === "manager") {
    html += `<button onclick="approve(${id})">承認</button>`;
    html += `<button onclick="reject(${id})">差戻</button>`;
  }

  if (mode === "rejected") {
    html += `<button onclick="resubmit(${id})">再申請</button>`;
    html += `<button onclick="editProject(${id})">編集</button>`;
    html += `<button onclick="deleteProject(${id})">削除</button>`;
  }

  return html;
}

// 操作関数
function approve(id) {
  const role = localStorage.getItem("loginRole");
  fetch(`/projects/${id}/approve?role=${role}`, { method: "PUT" })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      location.reload();
    });
}

function reject(id) {
  fetch(`/projects/${id}/reject`, { method: "PUT" })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      location.reload();
    });
}

function deleteProject(id) {
  if (!confirm("削除してよろしいですか？")) return;
  fetch(`/projects/${id}`, { method: "DELETE" })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      location.reload();
    });
}

function resubmit(id) {
  fetch(`/projects/${id}/resubmit`, { method: "PUT" })  // 別途エンドポイントが必要
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      location.reload();
    });
}

function editProject(id) {
  window.location.href = `register.html?id=${id}`;
}
