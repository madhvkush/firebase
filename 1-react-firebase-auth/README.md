# Getting Started with Firebase

## Step 1: Create Your Firebase Project

- Visit the [Firebase Console](https://console.firebase.google.com/) to create a new project.

## Step 2: Add Your Web App

- Navigate to your project overview:  
  [Firebase Project Overview](https://console.firebase.google.com/u/0/project/fir-react-6738c/overview)
- Add the Firebase app script to your project in `firebaseConfig.js`.

## Step 3: Set Up Authentication

- Go to the [Authentication Users Page](https://console.firebase.google.com/u/0/project/fir-react-6738c/authentication/users).
- Configure sign-in methods:  
  [Authentication Providers](https://console.firebase.google.com/u/0/project/fir-react-6738c/authentication/providers).

## Step 4: Set Up the Database

- Access the [Firebase Realtime Database](https://console.firebase.google.com/u/0/project/fir-react-6738c/database/fir-react-6738c-default-rtdb/data).

### Temporary Database Rules for Testing

For testing purposes, you can temporarily use the following rules:

#### Open Access (Not Recommended for Production)

```json
{
  "rules": {
    ".read": true, // Optional, depends if you also need to read
    ".write": true // Allows anyone to write
  }
}
//Authenticated Users Only (Safer Option)
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

## Step 5: Add Firebase Configuration

- Copy your Firebase configuration from the [Firebase Project Settings](https://console.firebase.google.com/u/0/project/fir-react-6738c/settings/general/web:MDhhYzhiZWEtNDFmYS00OTI2LThkYjUtMTZlYjQ4NWNkNjFi).
- Paste the configuration into the `~\src\firebaseConfig.js` file in your project.
