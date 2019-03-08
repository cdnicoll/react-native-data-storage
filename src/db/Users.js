import firebase from 'firebase';

export default {
  fetch: (req, res) => {
    const { currentUser } = firebase.auth();

    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
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
