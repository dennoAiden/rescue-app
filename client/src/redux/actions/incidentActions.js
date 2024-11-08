import Incident from '../../types/incident';  // Import incident structure

export const createIncident = (incidentData) => {
  return (dispatch) => {
    // The structure of the incident is created by merging incidentData and any default fields (if necessary)
    const newIncident = { ...incidentData };  // If you need to add default fields, you can merge them here

    dispatch({
      type: 'CREATE_INCIDENT',
      payload: newIncident, // Send the new incident to the reducer
    });
  };
};
