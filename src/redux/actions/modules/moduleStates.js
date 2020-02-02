export async function moduleStates(data,reduxID) {
  console.log("moduleStates");
  console.log("submit_id: " + reduxID);
  console.log("submit_data: " + data);
  return {
    type: 'MODULE_STATES',
    ["moduledata_" + reduxID]: data,
    stateName: "moduledata_" + reduxID
  };
}