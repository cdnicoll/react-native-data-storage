import firebase from 'firebase';

export default {
  fetch: (req, res) => {
    console.log('fetching employees...');
    const { currentUser } = firebase.auth();

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
          console.log('got them...');
          resolve(snapshot.val());
        });
    });
  },

  create: ({ name, age }) => {
    const { currentUser } = firebase.auth();

    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .push({ name, age })
      .then(() => {
        return { status: 200 };
      });
  },
};
