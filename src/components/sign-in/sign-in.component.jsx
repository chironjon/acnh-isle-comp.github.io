import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'

import { auth,  } from '../../firebase/firebase.utils';
// signInWithGoogle
import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' })
    } catch (err) {
      console.log('error signing in with email', err);
    }

    this.setState({ email: '', password: '' })
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value })
  }

  render() {
    return(
      <div className='sign-in'>
        <h2 className='title'>Existing User</h2>
        <span className='subtext'>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name='email' 
            type='email' 
            value={this.state.email} 
            label='email' 
            handleChange={this.handleChange} 
            required 
          />
          <FormInput 
            name='password' 
            type='password' 
            value={this.state.password} 
            label='password' 
            handleChange={this.handleChange} 
            required 
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            {/*<CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google </CustomButton>*/}
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;