document.addEventListener('DOMContentLoaded', loadAdminApproval);

function loadAdminApproval() {
  fetch('/projects/status/最終承認待ち')
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
    })
    .catch(err => {
      console.error("データ取得失敗:", err);
      alert("案件の取得に失敗しました");
    });
}

function renderButtons(project) {
  const role = localStorage.getItem("loginRole");
  if (role !== "admin") return "";

  return `
    <button onclick="approveProject(${project.id})">承認</button>
    <button onclick="rejectProject(${project.id})">差し戻し</button>
  `;
}

function approveProject(id) {
  const role = localStorage.getItem("loginRole");
  if (role !== "admin") return;

  if (!confirm("この案件を最終承認しますか？")) return;

  fetch(`/projects/${id}/approve?role=${role}`, { method: 'PUT' })
    .then(res => {
      if (!res.ok) throw new Error("承認失敗");
      return res.text();
    })
    .then(msg => {
      alert(msg);
      loadAdminApproval();
    })
    .catch(err => alert("承認エラー: " + err.message));
}

function rejectProject(id) {
  if (!confirm("この案件を差し戻しますか？")) return;

  fetch(`/projects/${id}/reject`, { method: 'PUT' })
    .then(res => {
      if (!res.ok) throw new Error("差し戻し失敗");
      return res.text();
    })
    .then(msg => {
      alert(msg);
      loadAdminApproval();
    })
    .catch(err => alert("差し戻しエラー: " + err.message));
}
