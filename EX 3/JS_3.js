// Show password
let togglePassword = document.querySelector('.toggle-password');
let inputPassword = document.querySelector('#password');

togglePassword.onclick = function () {
    if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        togglePassword.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
    } else {
        inputPassword.type = 'password';
        togglePassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;
    }
};
localStorage.setItem('users', JSON.stringify([
  {
    email: "thuy@gmail.com",
    password: "123456"
  }
]));

let users = JSON.parse(localStorage.getItem('users')) || [];
let form = document.getElementById('form');
let errorEmail = document.querySelector('.error-email');
let errorPassword = document.querySelector('.error-password');

form.onsubmit = function (e) {
    e.preventDefault();

    let email = form.email.value.trim();
    let password = form.password.value.trim();

    errorEmail.textContent = "";
    errorPassword.textContent = "";

    if (email === "") {
        errorEmail.textContent = "Email không được để trống";
        return;
    }

    if (password === "") {
        errorPassword.textContent = "Password không được để trống";
        return;
    }

    // Kiểm tra đăng nhập
    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        errorPassword.textContent = "Email hoặc mật khẩu sai";
        return;
    }

    alert("Đăng nhập thành công!");
    window.location.href = "";
};


