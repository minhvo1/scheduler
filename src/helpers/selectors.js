export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day)
  let appointments = [];
  if (filteredDay.length === 0) return appointments;
  for (const id of filteredDay[0].appointments) {
    appointments.push(state.appointments[id])
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) return null;

  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewer.name
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day)
  let interviewers = [];
  if (filteredDay.length === 0) return interviewers;
  for (const id of filteredDay[0].interviewers) {
    interviewers.push(state.interviewers[id])
  }
  return interviewers;
}