export default function(state, action) {
  switch (action.type) {
    case 'SAMPLE_ACTION':
      state = {
        ...state,
        'sampledata': action['sampledata']
      }
      return state;
    default:
      return !!state ? state : null
  }
}
