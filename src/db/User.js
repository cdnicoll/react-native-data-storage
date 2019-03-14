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

          // inject something in?
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
              console.log('setting persistence');
              auth
                .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function() {
                  console.log('persistance set');
                  return auth.signInAndRetrieveDataWithCredential(credential);
                })
                .catch(function(error) {
                  reject(error);
                });
            });
        })
        .catch(function(error) {
          reject(error);
        });
        resolve(true)
    });
  },

  /**
   * Unlinks a users account
   */
  unlinkAccount: () => {
    const { currentUser } = firebase.auth();
    console.log(currentUser.providerData[0].providerId);
    return new Promise((resolve, reject) => {
      currentUser
        .unlink(currentUser.providerData[0].providerId)
        .then(function() {
          console.log('unlinked users account');
          resolve(true);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },

  /**
   * Signs account out
   */
  signout: async () => {
    try {
      await firebase.auth().signOut();
      // signed out
    } catch (e){
     throw e;
    }
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

  /**
   * Gets the current user
   *
   * @return {Object} User Object
   */
  getUser: () => {
    return firebase.auth().currentUser;
  },
};
