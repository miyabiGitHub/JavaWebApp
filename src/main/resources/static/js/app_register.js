document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('projectForm');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
  
    // ✅ 編集モードならデータ取得
    if (id) {
      fetch(`/projects/${id}`)
        .then(res => res.json())
        .then(p => {
          document.getElementById('title').value = p.title;
          document.getElementById('customer').value = p.customer;
          document.getElementById('description').value = p.description;
          document.getElementById('member').value = p.member;
          document.getElementById('sales').value = p.sales;
          document.getElementById('type').value = p.type;
          document.getElementById('deadline').value;
          parseInt(document.getElementById('amount').value);
        })
        .catch(err => alert("データ取得エラー: " + err.message));
    }
  
    // ✅ 登録 or 更新処理
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const data = {
        title: document.getElementById('title').value,
        customer: document.getElementById('customer').value,
        description: document.getElementById('description').value,
        member: document.getElementById('member').value,
        sales: document.getElementById('sales').value,
        type: document.getElementById('type').value,
        deadline: document.getElementById('deadline').value,
        amount: parseInt(document.getElementById('amount').value),
      };
  
      const url = id ? `/projects/${id}` : '/projects';
      const method = id ? 'PUT' : 'POST';
  
      fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        if (!res.ok) throw new Error("登録エラー");
        return res.text();
      })
      .then(msg => {
        alert(msg);
        window.location.href = "project_list.html";
      })
      .catch(err => alert("登録失敗: " + err.message));
    });
  });