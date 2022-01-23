const params = new URL(window.location.href).searchParams;
const id = params.get("id");

const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

localStorage.clear();