import Auth from "@aws-amplify/auth";

const AWS_CONFIG = {
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
    identityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  },

  API: {
    endpoints: [
      {
        name: process.env.REACT_APP_AWS_API_GATEWAY_NAME,
        region: process.env.REACT_APP_AWS_REGION,
        endpoint: process.env.REACT_APP_AWS_API_GATEWAY_URL,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
          };
        },
      },
    ],
  }
};

export default AWS_CONFIG;