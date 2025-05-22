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

  document.addEventListener("DOMContentLoaded", () => {
  // 顧客名読み込み
  fetch("/customers/names")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("customer");
      data.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      });
    });

  // 参画者（エンジニア部）
  fetch("/employees/engineer")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("member");
      data.forEach(e => {
        const option = document.createElement("option");
        option.value = e.name;
        option.textContent = e.name;
        select.appendChild(option);
      });
    });

  // 担当営業（営業部）
  fetch("/employees/sales")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("sales");
      data.forEach(e => {
        const option = document.createElement("option");
        option.value = e.name;
        option.textContent = e.name;
        select.appendChild(option);
      });
    });

  // 登録イベント
  document.getElementById("projectForm").addEventListener("submit", e => {
    e.preventDefault();

    const data = {
      title: document.getElementById("title").value,
      customer: document.getElementById("customer").value,
      amount: document.getElementById("amount").value,
      member: document.getElementById("member").value,
      sales: document.getElementById("sales").value,
      type: document.getElementById("type").value,
      description: document.getElementById("description").value,
      deadline: document.getElementById("deadline").value
    };

    fetch("/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) throw new Error("登録失敗");
        return res.text();
      })
      .then(msg => alert("✅ " + msg))
      .catch(err => alert("❌ エラー: " + err.message));
  });
});
