export function validateRequired(value) {
  return value !== null && value !== undefined && String(value).trim() !== '';
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).trim());
}

export function validatePhone(phone) {
  const re = /^\+?[\d\s\-]{7,15}$/;
  return re.test(String(phone).trim());
}

export function validateDNI(dni) {
  const re = /^\d{6,10}$/;
  return re.test(String(dni).trim());
}

export function validateSpecialty(value) {
  return validateRequired(value);
}

export function validateForm(data) {
  const errors = {};

  if (!validateRequired(data.name)) errors.name = 'El nombre es obligatorio.';
  if (!validateDNI(data.dni)) errors.dni = 'La cédula/DNI es inválida.';
  if (!validateEmail(data.email)) errors.email = 'El correo electrónico es inválido.';
  if (!validatePhone(data.phone)) errors.phone = 'El teléfono es inválido.';
  if (!validateSpecialty(data.specialty)) errors.specialty = 'Seleccione una especialidad.';
  if (!validateRequired(data.date)) errors.date = 'Seleccione una fecha.';
  if (!validateRequired(data.time)) errors.time = 'Seleccione una hora.';

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
