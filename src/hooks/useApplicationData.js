import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // use effect to fetch data from the api
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // setDay 
  const setDay = day => setState(prev => ({ ...prev, day }));

  //Update Spots
  const updateSpots = (state, id, boolean) => {

    const newDays = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return {
          ...day,
          spots: boolean ? day.spots + 1 : day.spots - 1
        }
      }
      return day;
    })

    return newDays;

  }

  // bookInterview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    })

    return Promise.all([
      axios.put(`http://localhost:8001/api/appointments/${id}`,{"interview": interview})
    ]).then(res => {
      const days = updateSpots(state, id, false);
      setState({...state, days, appointments})
    
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Promise.all([
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
    ]).then(res => {
      const days = updateSpots(state, id, true);
      setState({...state, days, appointments})
    })
  }


  return { state, setDay, bookInterview, cancelInterview };
}