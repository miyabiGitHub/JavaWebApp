document.addEventListener('DOMContentLoaded', loadPending);

function loadPending() {
  fetch('/projects/status/承認待ち')
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
              <button onclick="approveProject(${p.id})">承認</button>
              <button onclick="rejectProject(${p.id})">差し戻し</button>
              <button onclick="deleteProject(${p.id})">削除</button>
            </td>
          </tr>
        `;
        list.insertAdjacentHTML('beforeend', row);
      });
    });
}

function approveProject(id) {
    if (!confirm("この案件を承認しますか？")) return;
  
    fetch(`/projects/${id}/approve`, { method: 'PUT' })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        loadPending();
      })
      .catch(err => alert("承認エラー: " + err.message));
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

function rejectProject(id) {
    if (!confirm("この案件を差し戻しますか？")) return;
  
    fetch(`/projects/${id}/reject`, {
      method: 'PUT'
    })
    .then(res => {
      if (!res.ok) throw new Error("差し戻し失敗");
      return res.text();
    })
    .then(msg => {
      alert(msg);
      loadPending(); // 再読み込み
    })
    .catch(err => alert("差し戻しエラー: " + err.message));
}
  

function editProject(id) {
  window.location.href = `register.html?id=${id}`;
}
