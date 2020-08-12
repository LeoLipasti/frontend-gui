export async function req_requestStates(data,reduxID) {
  return {
    type: 'REQUEST_STATES',
    'request-data': data,
    'request-type': reduxID
  };
}