let inpEmail = document.getElementById("email");
let inpPass = document.querySelector(".password");
let inpConfPass = document.querySelector(".conf-password");
let btn = document.querySelector(".btn");

btn.addEventListener("click", function (e) {
    e.preventDefault();
    handleSubmit();
});

function handleSubmit() {
    const emailValue = inpEmail.value.trim();
    const passValue = inpPass.value;
    const confPassValue = inpConfPass.value;

    if (emailValue === "" || passValue === "" || confPassValue === "") {
        console.log("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    if (passValue !== confPassValue) {
        console.log("Mật khẩu không khớp!");
        return;
    }

    const storedEmail = localStorage.getItem("email");
    if (storedEmail === emailValue) {
        console.log(`Email ${emailValue} đã tồn tại.`);
        return;
    }

    localStorage.setItem("email", emailValue);
    localStorage.setItem("password", passValue);
    console.log("Đăng ký thành công");
}
 document.getElementById("email") = "";
 document.querySelector(".password") = "";
 document.querySelector(".conf-password") ="";