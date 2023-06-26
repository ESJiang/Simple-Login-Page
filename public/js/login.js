const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

document.getElementById("myform").addEventListener("submit", function (event) {
    event.preventDefault();
});

document.getElementById("login").addEventListener("click", async () => {
    try {
        const username = nameInput.value;
        const password = passwordInput.value;

        if (username === "" || password === "") {
            message.textContent = "Please enter name & password";
            setTimeout(() => (message.textContent = ""), 3000);
        } else {
            const response = await axios.post("http://localhost:8080/login", {
                name: username,
                password: password,
            });

            nameInput.value = "";
            passwordInput.value = "";
            message.textContent = response.data.msg;
            setTimeout(() => (message.textContent = ""), 3000);
        }
    } catch (error) {
        message.textContent = error.response.data.msg;
        setTimeout(() => (message.textContent = ""), 3000);
        nameInput.value = "";
        passwordInput.value = "";
        console.error("Error fetching users:", error.response.data.msg);
    }
});
