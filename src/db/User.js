import firebase from 'firebase';

export default {
  /**
   * Login anonymously
   */
  loginAnonymous: () => {
    console.log('signing the user anonymously');
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInAnonymously()
        .then(user => {
          console.log(`user is signed in anonymously`);
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /**
   * Checks if the user is already logged int
   * @return {object} current user
   */
  isLoggedIn: () => {
    console.log('Checking if user is logged in:');
    const { currentUser } = firebase.auth();
    if (!currentUser) return false;
    return currentUser;
  },

  /**
   * Link an anonymous account to an email and password account
   * As well, handle merging the data
   *
   * @param {object} email and password
   */
  linkToEmailPassAccount: ({ email, password }) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password,
    );

    var auth = firebase.auth();

    // Get reference to the currently signed-in user
    const prevUser = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      auth
        .signInAndRetrieveDataWithCredential(credential)
        .then(function(userCredential) {
          const user = userCredential.user;
          var currentUser = user;
          // Merge prevUser and currentUser data stored in Firebase.
          // Note: How you handle this is specific to your application

          console.log(
            'TODO: Merge prevUser and currentUser data stored in Firebase.',
          );

          // After data is migrated delete the duplicate user
          return user
            .delete()
            .then(function() {
              console.log('Link the OAuth Credential to original account');
              // Link the OAuth Credential to original account
              return prevUser.linkAndRetrieveDataWithCredential(credential);
            })
            .then(function() {
              console.log('Sign in with the newly linked credential');
              // Sign in with the newly linked credential
              return auth.signInAndRetrieveDataWithCredential(credential);
            });
        })
        .catch(function(error) {
          console.log('Sign In Error', error);
        });
    });
  },

  /**
   * @deprecated use the link account methods
   *
   * Updates anonoymouse account to perminant account
   *
   * @param {object} email and password
   */
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

  /**
   * Checks to see if the account is an anonymous account
   * @return {boolean} account is anonymous or not
   */
  isAccountAnonymous: () => {
    console.log('Checking if account is anonymous');
    const { currentUser } = firebase.auth();

    if (!currentUser) return false;

    console.log('=====> ' + currentUser.isAnonymous);
    return currentUser.isAnonymous;
  },
};
