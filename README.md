Based on the content from the provided link, here is the `README.md` file rewritten in Markdown syntax:

# Next Identity Invite SDK Guide

This guide explains how to use the `nextidentity-invite-sdk.js` to invite new users to your application using the Next Identity API.

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/next-reason/ni-invite-js.git
cd ni-invite-js
```

2. **Install `node-fetch` (if needed)**: If you're using Node.js, install the `node-fetch` package:

   ```bash
   npm install node-fetch
   ```

   If you are using a bundler like Webpack or Parcel, `node-fetch` might not be necessary, as the browser's built-in `fetch` API will be used. Ensure your target environment supports `fetch`.

## Configuration (`config.js`)

1. **Open `config.js`**: Open the `config.js` file.

2. **Replace Placeholders**: Replace the placeholder values with your actual Next Identity API credentials and URLs:

   ```javascript
   export const getConfig = () => ({
       tokenUrl: 'YOUR_NEXT_IDENTITY_TOKEN_URL', // e.g., 'https://api.nextreason.com/oauth2/token'
       preRegisterUrl: 'YOUR_NEXT_IDENTITY_PREREGISTER_URL', // e.g., 'https://api.nextreason.com/v1/unify/journeys/pre-register'
       clientId: 'YOUR_CLIENT_ID',
       clientSecret: 'YOUR_CLIENT_SECRET',
       tenantId: 'YOUR_TENANT_ID',
   });
   ```

   - `tokenUrl`: The URL for obtaining an access token.
   - `preRegisterUrl`: The URL for pre-registering a user.
   - `clientId`: Your application's client ID.
   - `clientSecret`: Your application's client secret.
   - `tenantId`: Your Next Identity tenant ID.

## Usage

1. **Import the SDK and Configuration**: In your application file, import the SDK and configuration:

   ```javascript
   import { inviteUser } from './nextidentity-invite-sdk.js';
   import { getConfig } from './config.js';
   ```

2. **Invite a User**: Use the `inviteUser` function to invite a new user:

   ```javascript
   const config = getConfig();

   const user = {
       email: 'newuser@example.com',
       firstName: 'NameHere',
       tenant_id: tenantId,
       // Add other user attributes as needed
   };

   inviteUser(config, user)
       .then(response => {
           console.log('User invited successfully:', response);
       })
       .catch(error => {
           console.error('Error inviting user:', error);
       });
   ```

   - `config`: The configuration object imported from `config.js`.
   - `user`: An object containing user attributes such as `email`, `firstName`, and `lastName`. Add other attributes as required by your application.

Ensure that all necessary user attributes are included in the `user` object to meet the requirements of your Next Identity setup.

For more detailed information, refer to the Next Identity API documentation or contact your Next Identity support representative. 