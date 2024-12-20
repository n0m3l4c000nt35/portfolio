function fixHeader() {
  const headerHeight = document.querySelector(".header").offsetHeight;
  const main = document.querySelector("#about");
  document.documentElement.style.scrollPaddingTop = headerHeight + "px";
  main.style.marginTop = headerHeight + "px";
}

function showPlaces() {
  const places = document.querySelectorAll(".place");
  places.forEach(place => {
    place.addEventListener("click", () => {
      const degree = place.parentElement.querySelector(".degree");
      if (degree.style.maxHeight) degree.style.maxHeight = null;
      else degree.style.maxHeight = degree.scrollHeight + "px"; // Expande
    });
  });
}

function cursor() {
  const cursor = document.getElementById("cursor");
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const validateName = name => {
  const nameRegex = /^[a-zA-Z]+(?:[\s][a-zA-Z]+)*$/;
  return nameRegex.test(name);
};

const validateEmail = email => {
  const emailRegex = /^[a-z0-9._\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
  return emailRegex.test(email.toLowerCase());
};

const validateMessage = message => {
  return message.length >= 10 && message.length <= 500;
};

const showError = (input, message) => {
  const formControl = input.parentElement;
  let errorDiv = formControl.querySelector(".error-message");

  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    formControl.appendChild(errorDiv);
  }

  errorDiv.textContent = message;
  input.classList.add("error");
};

const clearError = input => {
  const formControl = input.parentElement;
  const errorDiv = formControl.querySelector(".error-message");
  if (errorDiv) {
    errorDiv.remove();
  }
  input.classList.remove("error");
};

nameInput.addEventListener("input", () => {
  if (!validateName(nameInput.value)) {
    showError(
      nameInput,
      "El nombre debe empezar y terminar con una letra, y solo puede contener letras y espacios en medio"
    );
  } else {
    clearError(nameInput);
  }
});

emailInput.addEventListener("input", () => {
  if (!validateEmail(emailInput.value)) {
    showError(emailInput, "Por favor, ingresa un email válido");
  } else {
    clearError(emailInput);
  }
});

messageInput.addEventListener("input", () => {
  if (!validateMessage(messageInput.value)) {
    showError(messageInput, "El mensaje debe tener entre 10 y 500 caracteres");
  } else {
    clearError(messageInput);
  }
});

form.addEventListener("submit", async e => {
  e.preventDefault();

  let isValid = true;

  if (!validateName(nameInput.value)) {
    showError(nameInput, "El nombre solo debe contener letras y espacios");
    isValid = false;
  }

  if (!validateEmail(emailInput.value)) {
    showError(emailInput, "Por favor, ingresa un email válido");
    isValid = false;
  }

  if (!validateMessage(messageInput.value)) {
    showError(messageInput, "El mensaje debe tener entre 10 y 500 caracteres");
    isValid = false;
  }

  if (isValid) {
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("¡Mensaje enviado con éxito!");
        form.reset();
      } else {
        throw new Error("Error al enviar el mensaje");
      }
    } catch (error) {
      alert("Error al enviar el formulario: " + error.message);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fixHeader();
  showPlaces();
  cursor();
});
