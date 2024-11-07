import Incident from '../../types/incident';  // Import incident structure

export const createIncident = (incidentData) => {
  return (dispatch) => {
    const newIncident = { ...Incident, ...incidentData }; // Merge data with the default structure
    dispatch({
      type: 'CREATE_INCIDENT',
      payload: newIncident,
    });
  };
};
