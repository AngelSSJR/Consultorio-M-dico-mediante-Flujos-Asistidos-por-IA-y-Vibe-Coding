const SIMULATED_DELAY_MS = 1200;

export async function requestAppointment(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        demo: true,
        reference: 'MC-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
        message: 'Solicitud registrada en modo demostrativo.',
        data,
      });
    }, SIMULATED_DELAY_MS);
  });
}
