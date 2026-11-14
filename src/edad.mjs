// Código de ejemplo para abrir PR de prueba contra el quiz.
export function calcularEdad(fechaNacimiento, hoy = new Date()) {
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getUTCFullYear() - nacimiento.getUTCFullYear();
  const mes = hoy.getUTCMonth() - nacimiento.getUTCMonth();
  if (mes < 0 || (mes === 0 && hoy.getUTCDate() < nacimiento.getUTCDate())) edad--;
  return edad;
}
