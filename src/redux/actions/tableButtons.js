export async function sampleAction(data) {
  console.log("sample action");
  return {
    type: 'SAMPLE_ACTION',
    sampledata: data
  };
}