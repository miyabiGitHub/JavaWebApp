document.addEventListener('DOMContentLoaded', loadCustomers);

function loadCustomers() {
  fetch('/customers')
    .then(res => res.json())
    .then(customers => {
      const list = document.getElementById('customer-list');
      list.innerHTML = '';

      customers.forEach(c => {
        const row = `
          <tr>
            <td>${c.name}</td>
            <td>${c.address}</td>
            <td>${c.contact}</td>
            <td>${c.sales}</td>
            <td>
              <button onclick="editCustomer(${c.id})">編集</button>
              <button onclick="deleteCustomer(${c.id})">削除</button>
            </td>
          </tr>
        `;
        list.insertAdjacentHTML('beforeend', row);
      });
    })
    .catch(err => console.error("一覧取得失敗:", err));
}

// ✅ 編集処理：ID付きで遷移
function editCustomer(id) {
  window.location.href = `customer.html?id=${id}`;
}

// ✅ 削除処理：確認 → 成功後に一覧再取得
function deleteCustomer(id) {
  if (!confirm("本当に削除しますか？")) return;

  fetch(`/customers/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) throw new Error("削除失敗");
      return res.text();
    })
    .then(msg => {
      alert(msg);
      loadCustomers(); // 再描画
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