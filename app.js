function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user && pass) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
  } else {
    alert('Нэр болон нууц үгээ оруулна уу!');
  }
}

function showTab(tabName) {
  document.getElementById('register-tab').classList.add('hidden');
  document.getElementById('records-tab').classList.add('hidden');
  document.getElementById(`${tabName}-tab`).classList.remove('hidden');

  // button active style
  document.getElementById('btn-register').classList.remove('bg-blue-100', 'text-blue-700');
  document.getElementById('btn-register').classList.add('bg-gray-100', 'text-gray-700');
  document.getElementById('btn-records').classList.remove('bg-blue-100', 'text-blue-700');
  document.getElementById('btn-records').classList.add('bg-gray-100', 'text-gray-700');

  if (tabName === 'register') {
    document.getElementById('btn-register').classList.add('bg-blue-100', 'text-blue-700');
  } else {
    document.getElementById('btn-records').classList.add('bg-blue-100', 'text-blue-700');
    loadRecords();
  }
}

function saveRecord() {
  const driverName = document.getElementById('driverName').value.trim();
  const carBrand = document.getElementById('carBrand').value;
  const carNumber = document.getElementById('carNumber').value.trim();
  const kmOut = parseInt(document.getElementById('kmOut').value);
  const kmIn = parseInt(document.getElementById('kmIn').value);
  const dateOut = document.getElementById('dateOut').value;
  const timeOut = document.getElementById('timeOut').value;
  const dateIn = document.getElementById('dateIn').value;
  const timeIn = document.getElementById('timeIn').value;
  const signature = document.getElementById('signature').value.trim();

  if (!driverName || !carBrand || !carNumber || isNaN(kmOut) || isNaN(kmIn) ||
      !dateOut || !timeOut || !dateIn || !timeIn || !signature) {
    alert('Бүх талбарыг бөглөнө үү!');
    return;
  }

  if (kmOut >= kmIn) {
    alert('Гарсан гүйлт нь орж ирсэн гүйлтээс бага байх ёстой!');
    return;
  }

  const record = {
    date: new Date().toLocaleString(),
    driver: driverName,
    brand: carBrand,
    number: carNumber,
    kmOut,
    kmIn,
    dateOut,
    timeOut,
    dateIn,
    timeIn,
    signer: signature
  };

  let records = JSON.parse(localStorage.getItem('carRecords') || '[]');
  records.unshift(record);
  localStorage.setItem('carRecords', JSON.stringify(records));

  // Reset form
  document.querySelectorAll('#register-tab input, #register-tab select').forEach(el => el.value = '');
  document.getElementById('saved-msg').textContent = 'Амжилттай хадгалагдлаа!';
  setTimeout(() => document.getElementById('saved-msg').textContent = '', 3000);
}


function loadRecords() {
  const list = document.getElementById('recordList');
  list.innerHTML = '';

  let records = JSON.parse(localStorage.getItem('carRecords') || '[]');
  records.forEach((rec) => {
    const li = document.createElement('li');
    li.className = 'border border-gray-200 p-4 rounded shadow-sm';
    li.innerHTML = `
      <p><strong>🗓 Бүртгэсэн огноо:</strong> ${rec.date}</p>
      <p><strong>🚘 Жолооч:</strong> ${rec.driver}</p>
      <p><strong>🚗 Марк:</strong> ${rec.brand}</p>
      <p><strong>🔢 Дугаар:</strong> ${rec.number}</p>
      <p><strong>➡️ Гарсан:</strong> ${rec.kmOut} км (${rec.dateOut} ${rec.timeOut})</p>
      <p><strong>⬅️ Орж ирсэн:</strong> ${rec.kmIn} км (${rec.dateIn} ${rec.timeIn})</p>
      <p><strong>✍️ Гарын үсэг:</strong> ${rec.signer}</p>
    `;
    list.appendChild(li);
  });

  if (records.length === 0) {
    list.innerHTML = '<p class="text-gray-500">Хадгалсан бүртгэл алга байна.</p>';
  }
}

