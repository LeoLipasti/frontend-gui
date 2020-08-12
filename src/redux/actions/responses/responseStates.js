export async function res_responseStates(response) {
  return {
    type: 'RESPONSE_STATES',
    'response-data': response.data,
    'response-type': response.type
  };
}