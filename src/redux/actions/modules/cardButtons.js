export async function sampleAction(data) {
  console.log("data: " + data);
  return {
    type: 'SAMPLE_ACTION',
    sampledata: data
  };
}