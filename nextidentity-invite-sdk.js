import { getConfig } from './config';

class NextIdentityInviteSDK {
  constructor() {
    this.config = getConfig();
    this.accessToken = null;
  }

  async getAccessToken() {
    try {
      const response = await fetch(this.config.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          scope: 'pre-register',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error response
        throw new Error(`Failed to get access token: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error; // Re-throw the error for handling by the caller
    }
  }

  async inviteUser(firstName, otherProfileFields = {}) {
    try {
      if (!this.accessToken) {
        await this.getAccessToken();
      }

      const profileFields = {
        firstName: firstName,
        tenant: this.config.tenantId,
        ...otherProfileFields, // Spread any additional profile fields
      };

      const response = await fetch(this.config.preRegisterUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          profile_fields: profileFields,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to invite user: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data; // Return the response from the pre-register API
    } catch (error) {
      console.error('Error inviting user:', error);
      throw error;
    }
  }
}

export default new NextIdentityInviteSDK(); // Export a singleton instance