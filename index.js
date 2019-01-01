console.log("Login Page");

const formLogin = document.getElementById("form-login")

const closeWindow = () => window.close()

const submitLogin = event => {
    event.preventDefault()

    const email = document.getElementById("email-form").value
    const password = document.getElementById("password-form").value

    if (email === "admin" && password === "admin") {

        window.open("/cart/")

        // window.close()

        closeWindow()

    } else {

        alert("Wrong Username or Password")

    }

}

formLogin.addEventListener("submit", submitLogin)