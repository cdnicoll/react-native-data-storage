import firebase from 'firebase';

export default {
  loginAnonymous: () => {
    console.log('signing the user');
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInAnonymously()
        .then(user => {
          console.log(`user is signed in`);
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  isLoggedIn: () => {
    const { currentUser } = firebase.auth();
    return currentUser;
  },

  loginEmailPass: () => {
    // TODO
  },

  updateToPerminantAccount: ({ email, password }) => {
    console.log('update account');
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password,
    );
    firebase
      .auth()
      .currentUser.linkAndRetrieveDataWithCredential(credential)
      .then(
        function(usercred) {
          var user = usercred.user;
          console.log('Anonymous account successfully upgraded', user);
        },
        function(error) {
          console.log('Error upgrading anonymous account', error);
        },
      );
  },

  isAccountAnonymous: () => {
    console.log('Checking if account is anonymous');
    const { currentUser } = firebase.auth();
    console.log(currentUser.isAnonymous);
    return currentUser.isAnonymous;
  },
};
