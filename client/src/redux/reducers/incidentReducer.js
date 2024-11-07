import Incident from '../../types/incident';

const initialState = {
  incidents: [],
};

const incidentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_INCIDENT':
      return {
        ...state,
        incidents: [...state.incidents, action.payload],
      };
    case 'UPDATE_INCIDENT':
      return {
        ...state,
        incidents: state.incidents.map(incident =>
          incident.id === action.payload.id ? { ...Incident, ...action.payload } : incident
        ),
      };

    default:
      return state;
  }
};

export default incidentReducer;
