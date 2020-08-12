export async function modelStates(data, model) {
  return {
    type: 'STATIC_MODELS',
    'data': data,
    'model': model,
  };
}