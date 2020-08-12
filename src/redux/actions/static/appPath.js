export async function appPath(data) {
  return {
    type: 'STATIC_APP_PATH',
    'appPath': data
  };
}