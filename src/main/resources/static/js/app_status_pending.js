document.addEventListener('DOMContentLoaded', loadPendingProjects);

function loadPendingProjects() {
  fetch('/projects/status/申請待ち')
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

function editProject(id) {
  window.location.href = `register.html?id=${id}`;
}

function submitProject(id) {
  if (!confirm("この案件を申請しますか？")) return;
  fetch(`/projects/${id}/submit`, { method: 'PUT' })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      loadPendingProjects();
    })
    .catch(err => alert("申請エラー: " + err.message));
}

function deleteProject(id) {
  if (!confirm("本当に削除しますか？")) return;
  fetch(`/projects/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error("削除失敗");
      return res.text();
    })
    .then(() => loadPendingProjects())
    .catch(err => alert("削除エラー: " + err.message));
}

function renderButtons(project) {
  const role = localStorage.getItem("loginRole");
  let html = "";

  if (project.status === "申請待ち" && role === "users") {
    html += `<button onclick="submitProject(${project.id})">申請</button>`;
    html += `<button onclick="editProject(${project.id})">編集</button>`;
    html += `<button onclick="deleteProject(${project.id})">削除</button>`;
  }

  return html;
}
