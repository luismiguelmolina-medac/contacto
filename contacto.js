let form = document.getElementById("form_edit");
let img = document.getElementById("img_contact");
let nombre = document.getElementById("nom_contact");
let telefono = document.getElementById("tel_contact");
let email = document.getElementById("mail_contact");
let contactos = JSON.parse(localStorage.getItem("contactos")) ?? [];

document.querySelector(".add-btn button").addEventListener("click", function () {
    document.querySelector(".main-content.empty").style.display = "none";
    document.querySelector(".main-content.form").style.display = "block";
    form.reset();
});

img.onkeyup = cargarImagen;
img.onchange = cargarImagen;

function cargarImagen() {
    let preview = img.value;
    document.getElementsByClassName("img-preview")[0].src = preview;
}

form.onsubmit = function (e) {
    e.preventDefault();

    let contacto = {
        nombre: nombre.value,
        telefono: telefono.value,
        email: email.value,
        img: img.value
    };
    contactos.push(contacto);
    localStorage.setItem("contactos", JSON.stringify(contactos));

    document.querySelector(".main-content.empty").style.display = "flex";
    document.querySelector(".main-content.form").style.display = "none";
}