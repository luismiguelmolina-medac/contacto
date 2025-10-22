let form = document.getElementById("form_edit");
let img = document.getElementById("img_contact");
let nombre = document.getElementById("nom_contact");
let telefono = document.getElementById("tel_contact");
let email = document.getElementById("mail_contact");
let contactos = JSON.parse(localStorage.getItem("contactos")) ?? [];
let posEdit = -1;

document.querySelector(".add-btn button").addEventListener("click", function () {
    document.querySelector(".main-content.empty").style.display = "none";
    document.querySelector(".main-content.form").style.display = "block";
    form.reset();
    document.getElementsByClassName("img-preview")[0].src = "imagenes/user.png";
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
    if (posEdit == -1) {
        contactos.push(contacto);
    } else {
        contactos[posEdit] = contacto;
    }

    localStorage.setItem("contactos", JSON.stringify(contactos));

    document.querySelector(".main-content.empty").style.display = "flex";
    document.querySelector(".main-content.form").style.display = "none";
    posEdit = -1;
    actualizarContactos();
}

function actualizarContactos() {
    let lista = document.getElementById("contact-list");
    lista.innerHTML = "";
    let i = 0;
    contactos.forEach(function (contacto) {
        /*lista.innerHTML += `
                    <div class="contact-item">
                        <div class="contact-info">
                            <img src="${contacto.img}" alt="Contacto">
                            <div>
                                <div class="fw-bold">${contacto.nombre}</div>
                                <div class="text-muted small">${contacto.telefono}</div>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-eye"></i></button>
                            <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
        `;*/

        let cont = document.createElement("div");
        cont.className = "contact-item";
        cont.innerHTML = `
                        <div class="contact-info">
                            <img src="${contacto.img}" alt="Contacto">
                            <div>
                                <div class="fw-bold">${contacto.nombre}</div>
                                <div class="text-muted small">${contacto.telefono}</div>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-secondary" onclick="verContacto(${i})"><i class="bi bi-eye"></i></button>
                            <button class="btn btn-sm btn-outline-danger" onclick="eliminarContacto(${i})"><i class="bi bi-trash"></i></button>
                        </div>
        `;

        i++;
        lista.appendChild(cont);
    });
}

function eliminarContacto(pos) {
    contactos.splice(pos, 1);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    actualizarContactos();
}

function verContacto(pos) {
    let contacto = contactos[pos];
    nombre.value = contacto.nombre;
    telefono.value = contacto.telefono;
    email.value = contacto.email;
    img.value = contacto.img;
    cargarImagen();
    posEdit = pos;
    document.querySelector(".main-content.empty").style.display = "none";
    document.querySelector(".main-content.form").style.display = "block";
}

actualizarContactos();