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
            <td>
              <button onclick="editProject(${p.id})">編集</button>
              <button onclick="deleteProject(${p.id})">削除</button>
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

function toggleSubMenu1() {
    const submenu1 = document.getElementById('submenu1');
    if (submenu1.style.display === 'none') {
        submenu1.style.display = 'block';
    } else {
        submenu1.style.display = 'none';
    }
}

function toggleSubMenu2() {
    const submenu2 = document.getElementById('submenu2');
    if (submenu2.style.display === 'none') {
        submenu2.style.display = 'block';
    } else {
        submenu2.style.display = 'none';
    }
}

function toggleSubMenu3() {
    const submenu3 = document.getElementById('submenu3');
    if (submenu3.style.display === 'none') {
        submenu3.style.display = 'block';
    } else {
        submenu3.style.display = 'none';
    }
}

function toggleSubMenu4() {
    const submenu4 = document.getElementById('submenu4');
    if (submenu4.style.display === 'none') {
        submenu4.style.display = 'block';
    } else {
        submenu4.style.display = 'none';
    }
}