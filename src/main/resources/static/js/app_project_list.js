document.addEventListener('DOMContentLoaded', loadProjects);

function loadProjects() {
  fetch("/projects")
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
            <td>${p.description}</td>
            <td>${p.deadline}</td>
            <td>${p.status}</td>
            <td>
              ${p.status !== '承認済み' ? `<button onclick="approve(${p.id})">承認</button>` : ''}
              ${p.status !== '承認済み' ? `<button onclick="reject(${p.id})">差戻</button>` : ''}
              ${p.status !== '承認済み' ? `<button onclick="remove(${p.id})">削除</button>` : ''}
            </td>
          </tr>
        `;
        list.insertAdjacentHTML("beforeend", row);
      });
    });
}

function approve(id) {
  fetch(`/projects/${id}/approve`, { method: 'PUT' })
    .then(() => loadProjects());
}

function reject(id) {
  fetch(`/projects/${id}/reject`, { method: 'PUT' })
    .then(() => loadProjects());
}

function remove(id) {
  if (!confirm("本当に削除しますか？")) return;
  fetch(`/projects/${id}`, { method: 'DELETE' })
    .then(() => loadProjects());
}
