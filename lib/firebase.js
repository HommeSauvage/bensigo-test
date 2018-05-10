import config from '../config';

export const initFirebase = async () => {
  const firebase = await import('firebase');
  try {
    firebase.initializeApp(config.firebase);

  } catch (err) {
    return console.log(err.stack);
  }
  return firebase.auth();
};
