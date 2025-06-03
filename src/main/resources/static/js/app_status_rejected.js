document.addEventListener('DOMContentLoaded', loadPending);

function loadPending() {
  fetch('/projects/status/差し戻し')
    .then(res => res.json())
    .then(projects => {
      const list = document.getElementById('project-list');
      list.innerHTML = '';
      projects.forEach(p => {
        const row = `
          <tr>
            <td>${p.title}</td>
            <td>${p.customer}</td>
            <td>${p.description}</td>
            <td>${p.member}</td>
            <td>${p.sales}</td>
            <td>${p.type}</td>
            <td>${renderButtons(p)}</td>
          </tr>
        `;
        list.insertAdjacentHTML('beforeend', row);
      });
    });
}

function deleteProject(id) {
    if (!confirm("本当に削除しますか？")) return;
    fetch(`/projects/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error("削除失敗");
        return res.text();
      })
      .then(msg => {
        alert(msg);
        loadProjects();
      })
      .catch(err => alert("削除エラー: " + err.message));
  }

function editProject(id) {
  window.location.href = `register.html?id=${id}`;
}

function submitProject(id) {
  if (!confirm("この案件を申請しますか？")) return;
  fetch(`/projects/${id}/submit`, { method: 'PUT' })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      loadPending(); // 再描画
    })
    .catch(err => alert("申請エラー: " + err.message));
}

function rejectProject(id) {
  if (!confirm("この案件を差し戻しますか？")) return;

  fetch(`/projects/${id}/reject`, {
    method: 'PUT'
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    location.reload();
  })
  .catch(err => alert("差し戻し失敗: " + err.message));
}

function renderButtons(project) {
  const role = localStorage.getItem("loginRole");
  let html = "";

  // 申請待ち → usersが申請できる
  if (project.status === "申請待ち" && role === "users") {
    html += `<button onclick="submitProject(${project.id})">申請</button>`;
    html += `<button onclick="editProject(${project.id})">編集</button>`;
    html += `<button onclick="deleteProject(${project.id})">削除</button>`;
  }

  // 差し戻し → usersが再申請できる
  if (project.status === "差し戻し" && role === "users") {
    html += `<button onclick="editProject(${project.id})">編集</button>`;
    html += `<button onclick="resubmitProject(${project.id})">再申請</button>`;
  }

  // 部長承認待ち → managerが承認・差し戻しできる
  if (project.status === "部長承認待ち" && role === "manager") {
    html += `<button onclick="approveProject(${project.id})">承認</button>`;
    html += `<button onclick="rejectProject(${project.id})">差し戻し</button>`;
  }

  // 最終承認待ち → adminが承認・差し戻しできる
  if (project.status === "最終承認待ち" && role === "admin") {
    html += `<button onclick="approveProject(${project.id})">承認</button>`;
    html += `<button onclick="rejectProject(${project.id})">差し戻し</button>`;
  }

  return html;
}
