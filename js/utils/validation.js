const MIN_DATE = "2026-11-01";

export function validateRequired(value) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

export function validateName(name) {
  const value = String(name).trim();
  if (!value) {return false;}
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value);
}

export function validateEmail(email) {
  const value = String(email).trim();
  return value.includes("@") && value.toLowerCase().includes(".com");
}

export function validatePhone(phone) {
  const re = /^\+?[\d\s-]{7,15}$/;
  return re.test(String(phone).trim());
}

export function validateDNI(dni) {
  const re = /^\d{6,10}$/;
  return re.test(String(dni).trim());
}

export function validateSpecialty(value) {
  return validateRequired(value);
}

export function validateDate(dateStr) {
  const value = String(dateStr).trim();
  if (!value) {return false;}
  return value >= MIN_DATE;
}

export function validateTime(value) {
  return validateRequired(value);
}

export function validateForm(data) {
  const errors = {};

  if (!validateName(data.name)) {errors.name = "El nombre solo debe contener letras.";}
  if (!validateDNI(data.dni)) {errors.dni = "La cédula/DNI es inválida (solo números, 6 a 10 dígitos).";}
  if (!validateEmail(data.email)) {errors.email = "El correo debe contener @ y terminar en .com.";}
  if (!validatePhone(data.phone)) {errors.phone = "El teléfono es inválido.";}
  if (!validateSpecialty(data.specialty)) {errors.specialty = "Seleccione una especialidad.";}
  if (!validateDate(data.date)) {errors.date = `La fecha debe ser desde el ${MIN_DATE} en adelante.`;}
  if (!validateTime(data.time)) {errors.time = "Seleccione una hora.";}

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
