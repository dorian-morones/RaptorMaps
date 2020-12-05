export default (state, action) => {
  switch (action.type) {
    case "UPDATE_GEO_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "LAST_DATA_UPDATE":
      return {
        ...state,
        lastRequest: action.payload,
      };
    default:
      return state;
  }
};
