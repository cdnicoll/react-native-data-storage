# Application
React Native example for data storage with firebase

## Goals
  - When app launches it will login and fetch all users
  - Ability to create new users and save them to Firebase
  - User has the ability to convert their anonymous account to a perminant account
  - If the account is anonymous:
    - Upon closing the app and reopening it, data should be persistant
    - When deleting the app and reinstalling it, data should be gone
    - Data is not accessible from other devices
  - If the account is perminant:
    - Upon closing the app and reopening it, data should be persistant
    - When deleting the app and reinstalling it, logging in, the user should then see their data
    - If they create data under an anonymous account, but also have data under a perminant account and switch the data, proper logic should be handled

## Commands
```
# Install & Setup
yarn install

# copy .env.dist to .env and update firebase API Key

# Run application
yarn ios
```

---

See [TODO](https://github.com/cdnicoll/react-native-data-storage/blob/master/TODO) for application state and upcoming changes/plans