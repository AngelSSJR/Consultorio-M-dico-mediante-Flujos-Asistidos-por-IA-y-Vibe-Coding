import { validateForm } from "../utils/validation.js";
import { requestAppointment } from "../services/appointment-service.js";
import { APPOINTMENT_DEMO_NOTICE } from "../config/constants.js";

export function initAppointmentForm(formId, onSuccess) {
  const form = document.getElementById(formId);
  if (!form) {return;}

  const notice = document.createElement("p");
  notice.className = "text-xs text-secondary mt-2 mb-4";
  notice.textContent = APPOINTMENT_DEMO_NOTICE;
  form.prepend(notice);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const { isValid, errors } = validateForm(data);

    form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));

    if (!isValid) {
      Object.entries(errors).forEach(([field, message]) => {
        const input = form.elements[field];
        if (input) {
          input.classList.add("error");
          const existing = input.parentElement.querySelector(".error-msg");
          if (!existing) {
            const errorMsg = document.createElement("span");
            errorMsg.className = "error-msg text-error text-xs mt-1 block";
            errorMsg.textContent = message;
            input.parentElement.appendChild(errorMsg);
          }
        }
      });
      return;
    }

    const submitBtn = form.querySelector("button[type=\"submit\"]");
    const originalText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Procesando...";
    }

    try {
      const result = await requestAppointment(data);
      if (onSuccess) {onSuccess(result);}
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al procesar la solicitud.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });
}
