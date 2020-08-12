export async function sampleAction(data) {
  return {
    type: 'SAMPLE_ACTION',
    'sampledata': data
  };
}