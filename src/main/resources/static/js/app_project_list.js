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
          </tr>
        `;
        list.insertAdjacentHTML("beforeend", row);
      });
    });
}