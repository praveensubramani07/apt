import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';



function Login() {
  const responseMessage = (response) => {
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log(error);
  };
  
  const onSuccess = (response) => {
    console.log(response.credential);
   
  };



  return (
    <GoogleOAuthProvider clientId="268873119322-g9kj6sj7fb8dmbs2mnj2r14gnk719md0.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default Login;
