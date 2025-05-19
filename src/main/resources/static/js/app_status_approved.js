document.addEventListener('DOMContentLoaded', loadPending);

function loadPending() {
  fetch('/projects/status/承認済み')
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
            </td>
          </tr>
        `;
        list.insertAdjacentHTML('beforeend', row);
      });
    });
}


function editProject(id) {
  window.location.href = `register.html?id=${id}`;
}
