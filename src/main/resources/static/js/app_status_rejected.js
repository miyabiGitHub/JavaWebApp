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
            <td>
              <button onclick="editProject(${p.id})">編集</button>
              <button onclick="deleteProject(${p.id})">削除</button>
            </td>
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
