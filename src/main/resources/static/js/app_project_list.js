document.addEventListener('DOMContentLoaded', loadProjects);

function loadProjects() {
  fetch('/projects')
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
            <td>${p.deadline}</td> <!-- ✅ -->
            <td>¥${p.amount.toLocaleString()}</td> 
            <td>${p.status}</td>
            <td>
              <button onclick="editProject(${p.id})">編集</button>
            </td>
          </tr>
        `;
        list.insertAdjacentHTML('beforeend', row);
      });
    })
    .catch(err => console.error("案件一覧取得失敗:", err));
}

function editProject(id) {
  window.location.href = `register.html?id=${id}`;
}