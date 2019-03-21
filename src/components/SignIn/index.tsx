import React from 'react'
import SignInMain from './SignInMain';
import { withRouter } from 'react-router-dom';

const SignInComponent = ({ history }: { [key: string]: any }) => (
    <div>
      <h1>SignIn</h1>
      <SignInMain history={history} />
    </div>
  );

export const SignIn = withRouter(SignInComponent)