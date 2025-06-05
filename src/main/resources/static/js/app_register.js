document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('projectForm');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // データ初期表示（編集モード）
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
        document.getElementById('deadline').value = p.deadline;
        document.getElementById('amount').value = p.amount;
      })
      .catch(err => alert("データ取得エラー: " + err.message));
  }

  // select項目読み込み（顧客 / エンジニア / 営業）
  Promise.all([
    fetch("/customers/names").then(res => res.json()),
    fetch("/employees/engineer").then(res => res.json()),
    fetch("/employees/sales").then(res => res.json())
  ]).then(([customers, engineers, sales]) => {
    const customerSelect = document.getElementById("customer");
    customers.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      customerSelect.appendChild(option);
    });

    const engineerSelect = document.getElementById("member");
    engineers.forEach(e => {
      const option = document.createElement("option");
      option.value = e.name;
      option.textContent = e.name;
      engineerSelect.appendChild(option);
    });

    const salesSelect = document.getElementById("sales");
    sales.forEach(e => {
      const option = document.createElement("option");
      option.value = e.name;
      option.textContent = e.name;
      salesSelect.appendChild(option);
    });
  });

  // ✅ フォーム送信処理（1回だけ！）
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
