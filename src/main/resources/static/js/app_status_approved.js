// ✅ 正しい関数名に変更（承認済み案件一覧を表示するため）
document.addEventListener('DOMContentLoaded', loadApprovedProjects);

function loadApprovedProjects() {
  fetch('/projects/status/最終承認済み')  // ← DB上の正式なステータス文字列
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
            <td><!-- 操作なし --></td>
          </tr>
        `;
        list.insertAdjacentHTML('beforeend', row);
      });
    })
    .catch(err => console.error("承認済み一覧取得エラー:", err));
}

// ✅ 以下は他ファイルや他画面用：この画面では不要
function submitProject(id) {
  if (!confirm("この案件を申請しますか？")) return;
  fetch(`/projects/${id}/submit`, { method: 'PUT' })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      loadApprovedProjects(); // ← 状態更新後に再読み込み（ここでは使わないかも）
    })
    .catch(err => alert("申請エラー: " + err.message));
}

function rejectProject(id) {
  if (!confirm("この案件を差し戻しますか？")) return;
  fetch(`/projects/${id}/reject`, { method: 'PUT' })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      loadApprovedProjects(); // ← 状態更新後に再描画
    })
    .catch(err => alert("差し戻しエラー: " + err.message));
}

function editProject(id) {
  window.location.href = `register.html?id=${id}`;
}
