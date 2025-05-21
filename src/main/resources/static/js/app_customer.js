document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('customerForm');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
  
    // ✅ 編集モード時：既存のデータをフォームに反映
    if (id) {
      fetch(`/customers/${id}`)
        .then(res => res.json())
        .then(customer => {
          document.getElementById('name').value = customer.name;
          document.getElementById('address').value = customer.address;
          document.getElementById('contact').value = customer.contact;
          document.getElementById('sales').value = customer.sales;
        })
        .catch(err => alert("データ取得エラー: " + err.message));
    }
  
    // ✅ 登録 or 更新処理
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const data = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        contact: document.getElementById('contact').value,
        sales: document.getElementById('sales').value
      };
  
      const url = id ? `/customers/${id}` : '/customers';
      const method = id ? 'PUT' : 'POST';
  
      fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        if (!res.ok) throw new Error("保存エラー");
        return res.text();
      })
      .then(msg => {
        alert(msg);
        window.location.href = "customer_list.html";
      })
      .catch(err => alert("登録失敗: " + err.message));
    });
  });  

  document.addEventListener("DOMContentLoaded", () => {
  fetch('/employees/sales')
    .then(res => res.json())
    .then(employees => {
      const select = document.getElementById("sales");
      employees.forEach(emp => {
        const opt = document.createElement("option");
        opt.value = emp.name;
        opt.textContent = emp.name;
        select.appendChild(opt);
      });
    })
    .catch(err => {
      console.error("営業部取得失敗:", err);
    });
});
