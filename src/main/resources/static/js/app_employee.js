document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('employeeForm');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (id) {
    fetch(`/employees/${id}`)
      .then(res => res.json())
      .then(emp => {
        document.getElementById('name').value = emp.name;
        document.getElementById('age').value = emp.age;
        document.getElementById('department').value = emp.department;
        document.getElementById('phone').value = emp.phone;
        document.getElementById('pisition').value = emp.position;
      })
      .catch(err => {
        alert("取得失敗: " + err.message);
      });
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      age: parseInt(document.getElementById("age").value),
      phone: document.getElementById("phone").value,
      department: document.getElementById("department").value,
      position: document.getElementById("position").value
    };

    const url = id ? `/employees/${id}` : '/employees';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error('登録失敗');
      return response.text();
    })
    .then(msg => {
      alert('✅ ' + msg);
      window.location.href = 'employee_list.html';
    })
    .catch(error => {
      alert('エラー: ' + error.message);
    });
  });
});