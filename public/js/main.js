const productForm = document.getElementById("productForm");
const inputName = document.getElementById("title");
const inputPrice = document.getElementById("price");
const tbodyProducts = document.getElementById("tableContent");

const chatForm = document.getElementById("chatForm");
const inputEmail = document.getElementById("email");
const messaggesDiv = document.getElementById("chat");
const inputMessage = document.getElementById("message");

const socket = io();

window.addEventListener("load", function (e) {
    socket.emit("newConnection");
});

socket.on("welcome", (data) => {
    alert(data);
});

//Add new prodcut
productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newProduct = {
        title: inputName.value,
        price: inputPrice.value,
    };

  //Emit product to the server
    socket.emit("addProduct", newProduct);

    inputName.value = "";
    inputPrice.value = "";
});

socket.on("lastProduct", (lastProduct) => {
    AddNewProduct(lastProduct);
});

function AddNewProduct(lastProduct) {
    const trProduct = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdPrice = document.createElement("td");

    trProduct.appendChild(tdTitle);
    trProduct.appendChild(tdPrice);

    tdTitle.innerText = lastProduct.title;
    tdPrice.innerText = lastProduct.price;


    tbodyProducts.appendChild(trProduct);
}

//Send Message
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let message = {
    email: inputEmail.value,
    message: inputMessage.value,
};

  //Emit message to the server
    socket.emit("sendMesssage", message);

    inputEmail.value = "";
    inputMessage.value = "";
});

socket.on("lastMessage", (lastMessage) => {
    AddNewMessage(lastMessage);
});

function AddNewMessage(lastMessage) {
    const pEmail = document.createElement("p");
    const pTime = document.createElement("p");
    const pMessage = document.createElement("p");
    const finalMessage = document.createElement("p");

    pEmail.classList.add("emailAzulNegrita");
    pTime.classList.add("horaRojo");
    pMessage.classList.add("mensajeVerdeCursiva");

    pEmail.innerText = lastMessage.email;
    pTime.innerText = `[${lastMessage.time}]:`;
    pMessage.innerText = `${lastMessage.message}`;

    finalMessage.appendChild(pEmail);
    finalMessage.appendChild(pTime);
    finalMessage.appendChild(pMessage);

    finalMessage.classList.add("mensajeFinal");

    messaggesDiv.appendChild(finalMessage);
}