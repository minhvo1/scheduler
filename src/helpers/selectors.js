export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day)
  let appointments = [];
  if (filteredDay.length === 0) return appointments;
  for (const id of filteredDay[0].appointments) {
    appointments.push(state.appointments[id])
  }
  return appointments;
}