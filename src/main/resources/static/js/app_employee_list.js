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
            <td>${emp.position}</td>
            <td>${emp.phone}</td>
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
