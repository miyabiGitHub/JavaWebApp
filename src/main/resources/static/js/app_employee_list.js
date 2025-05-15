document.addEventListener('DOMContentLoaded', loadEmployees);

function loadEmployees() {
  fetch('/employees')
    .then(response => response.json())
    .then(employees => {
      const list = document.getElementById('employee-list');
      list.innerHTML = ''; // 初期化

      employees.forEach(emp => {
        const row = `
          <tr>
            <td>${emp.name}</td>
            <td>${emp.age}</td>
            <td>${emp.department}</td>
            <td>
              <button onclick="editEmployee('${emp.id}')">編集</button>
              <button onclick="deleteEmployee('${emp.id}')">削除</button>
            </td>
          </tr>
        `;
        list.insertAdjacentHTML('beforeend', row);
      });
    })
    .catch(error => {
      console.error('社員一覧取得エラー:', error);
    });
}

function editEmployee(id) {
  window.location.href = `employee.html?id=${id}`;
}

function deleteEmployee(id) {
  if (!confirm("本当にこの社員を削除しますか？")) return;

  fetch(`/employees/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (!res.ok) throw new Error("削除失敗");
    return res.text();
  })
  .then(msg => {
    alert(msg);
    loadEmployees();
  })
  .catch(err => {
    alert("エラー発生: " + err.message);
  });
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