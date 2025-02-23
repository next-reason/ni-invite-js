Next Identity Invite SDK Guide
This guide explains how to use the nextidentity-invite-sdk.js to invite new users to your application using the Next Identity API.

Installation
Create files: Create two files: nextidentity-invite-sdk.js and config.js in your project.

Copy code: Copy the code provided in the previous response into the respective files.

Install node-fetch (if needed): If you're using Node.js, install the node-fetch package:

Bash

npm install node-fetch
If you are using a bundler like Webpack or Parcel, node-fetch might not be necessary. The browser's built-in fetch API will be used. Make sure your target environment supports fetch.

Configuration (config.js)
Open config.js: Open the config.js file.

Replace placeholders: Replace the placeholder values with your actual Next Identity API credentials and URLs:

JavaScript

export const getConfig = () => ({
  tokenUrl: 'YOUR_NEXT_IDENTITY_TOKEN_URL', // e.g., 'https://api.nextreason.com/oauth2/token'
  preRegisterUrl: 'YOUR_NEXT_IDENTITY_PREREGISTER_URL', // e.g., 'https://api.nextreason.com/v1/unify/journeys/pre-register'
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  tenantId: 'YOUR_TENANT_ID',
});
tokenUrl: The URL for obtaining an access token.
preRegisterUrl: The URL for the pre-register API endpoint.
clientId: Your Next Identity client ID.
clientSecret: Your Next Identity client secret.
tenantId: Your Next Identity tenant ID.
Usage
Import the SDK: In your application code, import the SDK:

JavaScript

import NextIdentityInviteSDK from './nextidentity-invite-sdk';
Invite a user: Call the inviteUser() method, providing the first name and any other profile fields:

JavaScript

async function inviteNewUser() {
  try {
    const inviteResponse = await NextIdentityInviteSDK.inviteUser('John', {
      lastName: 'Doe',
      email: 'john.doe@example.com',
      // Add other profile fields as needed
    });
    console.log('User invited successfully:', inviteResponse);
    // Process the successful inviteResponse, which likely contains a registration URL
  } catch (error) {
    console.error('Failed to invite user:', error);
    // Handle the error, e.g., display an error message to the user
  }
}

inviteNewUser();
The first argument to inviteUser() is the required firstName.
The second argument is an optional object containing other profile fields (e.g., lastName, email).
The inviteResponse will contain the response from the Next Identity pre-register API. This will likely include a registration URL that you can then redirect the user to.
Handle the response: Process the inviteResponse to redirect the user to the registration URL or handle any errors.

Example with minimal profile fields
JavaScript

async function inviteNewUser() {
  try {
    const inviteResponse = await NextIdentityInviteSDK.inviteUser('Jane'); // Only first name is provided
    console.log('User invited successfully:', inviteResponse);
  } catch (error) {
    console.error('Failed to invite user:', error);
  }
}

inviteNewUser();
Error Handling
The inviteUser() method will throw an error if the API call fails.  Make sure to wrap your code in a try...catch block to handle these errors gracefully.  The error object will contain information about the failure.

Additional Profile Fields
You can add any other profile fields required by your Next Identity configuration by including them in the second argument of the inviteUser method.  These will be included in the pre-registration API call.  Make sure these fields are properly configured on your Next Identity tenant.