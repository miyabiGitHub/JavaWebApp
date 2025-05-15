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
      })
      .catch(err => {
        alert("取得失敗: " + err.message);
      });
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
      name: document.getElementById('name').value,
      age: parseInt(document.getElementById('age').value),
      department: document.getElementById('department').value
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