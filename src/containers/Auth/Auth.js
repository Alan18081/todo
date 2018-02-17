import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Route,Switch,Redirect} from 'react-router-dom';

import classes from './Auth.sass';

import {checkValidity} from '../../helpers/helpers';
import Asx from '../../hoc/Asx/Asx';
import Logo from '../../components/Header/Logo/Logo';
import * as actions from '../../store/actions/index';
import AuthForm from '../../components/Auth/AuthForm/AuthForm';

class Auth extends Component {
  state = {
    signUpForm: {
      controls: {
        login: {
          elemType: 'input',
          elemConfig: {
            type: 'text',
            placeholder: 'Login'
          },
          value: '',
          validation: {
            rules: {
              required: true,
              minLength: 6
            },
            messages: {
              required: 'You should fill this field',
              minLength: 'Your login should have at least 6 characters'
            }
          },
          errorMessage: '',
          valid: false,
          touched: false
        },
        email: {
          elemType: 'input',
          elemConfig: {
            type: 'email',
            placeholder: 'Email'
          },
          value: '',
          validation: {
            rules: {
              required: true,
              minLength: 6,
              email: /[a-z0-9]+@[a-z0-9]+\.[a-z]/
            },
            messages: {
              required: 'You should fill this field',
              minLength: 'Your email should have at least 6 characters',
              email: 'Write email properly, please'
            }
          },
          errorMessage: '',
          valid: false,
          touched: false
        },
        password: {
          elemType: 'input',
          elemConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          indexPassword: 'pass1',
          validation: {
            rules: {
              required: true,
              minLength: 4,
              matchPasswords: true
            },
            messages: {
              required: 'You should fill this field',
              minLength: 'Your password should have at least 6 characters',
              matchPasswords: 'Your passwords should match'
            }
          },
          errorMessage: '',
          value: '',
          valid: false,
          touched: false
        },
        password_2: {
          elemType: 'input',
          elemConfig: {
            type: 'password',
            placeholder: 'Confirm password'
          },
          indexPassword: 'pass2',
          validation: {
            rules: {
              required: true,
              minLength: 4,
              matchPasswords: true
            },
            messages: {
              required: 'You should fill this field',
              minLength: 'Your password should have at least 6 characters',
              matchPasswords: 'Your passwords should match'
            }
          },
          errorMessage: '',
          value: '',
          valid: false,
          touched: false
        }
      },
      passwords: {
        pass1: '',
        pass2: ''
      },
      btn: 'Sign Up',
      title: 'Create account',
      formIsValid: false,
      links: [
        {
          path: '/auth',
          caption: 'Login'
        },
        {
          path: '/auth/reset',
          caption: 'Forgot password'
        }
      ]
    },
    signInForm: {
      controls: {
        email: {
          elemType: 'input',
          elemConfig: {
            type: 'email',
            placeholder: 'Email'
          },
          value: '',
          validation: {
            rules: {
              required: true,
              minLength: 6,
              email: /[a-z0-9]+@[a-z0-9]+\.[a-z]/
            },
            messages: {
              required: 'You should fill this field',
              minLength: 'Your email should have at least 6 characters',
              email: 'Write email properly, please'
            }
          },
          errorMessage: '',
          valid: false,
          touched: false
        },
        password: {
          elemType: 'input',
          elemConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            rules: {
              required: true,
              minLength: 6
            },
            messages: {
              required: 'You should fill this field',
              minLength: 'Your password should have at least 6 characters'
            }
          },
          errorMessage: '',
          valid: false,
          touched: false
        }
      },
      btn: 'Sign In',
      title: 'Login',
      formIsValid: false,
      links: [
        {
          path: '/auth/sign_up',
          caption: 'Create account'
        },
        {
          path: '/auth/reset',
          caption: 'Forgot password'
        }
      ]
    },
    resetPasswordForm: {
      controls: {
        email: {
          elemType: 'input',
          elemConfig: {
            type: 'email',
            placeholder: 'Email'
          },
          value: '',
          validation: {
            rules: {
              required: true,
              minLength: 6,
              email: /[a-z0-9]+@[a-z0-9]+\.[a-z]/
            },
            messages: {
              required: 'You should fill this field',
              minLength: 'Your email should have at least 6 characters',
              email: 'Write email properly, please'
            }
          },
          errorMessage: '',
          valid: false,
          touched: false
        }
      },
      btn: 'Send code',
      title: 'Write email address of your account',
      formIsValid: false,
      links: [
        {
          path: '/auth',
          caption: 'Login'
        },
        {
          path: '/auth/sign_up',
          caption: 'Create account'
        }
      ]
    }
  };
  signInHandler = (event) => {
    event.preventDefault();
    const authInfo = {
      email: this.state.signInForm.controls.email.value,
      password: this.state.signInForm.controls.password.value,
      returnSecureToken: true
    };
    this.props.onLogin(authInfo);
  };
  signUpHandler = (event) => {
    event.preventDefault();
    const authInfo = {
      email: this.state.signUpForm.controls.email.value,
      password: this.state.signUpForm.controls.password.value,
      returnSecureToken: true
    };
    const login = this.state.signUpForm.controls.login.value
    this.props.onAuth(authInfo,login);
  };
  resetPasswordHandler = (event) => {
    event.preventDefault();
    const authInfo = {
      requestType: 'PASSWORD_RESET',
      email: this.state.resetPasswordForm.controls.email.value
    };
    this.props.onSendResetPasswordCode(authInfo);
  };
  inputChangeHandler = (type,value,itemId) => {
    const updatedItems = {...this.state[type].controls};
    const updatedItem = {...updatedItems[itemId]};
    updatedItem.touched = true;
    updatedItem.value = value;
    const validResult = checkValidity(value,updatedItem.validation);
    updatedItem.valid = validResult.valid;
    updatedItem.errorMessage = validResult.message;
    let matchedPasswords;
    let matchPasswordsMessage = updatedItem.validation.messages.matchPasswords;
    let passwords = {...this.state[type].passwords};
    passwords[updatedItem.indexPassword] = value;
    if(updatedItem.indexPassword && updatedItem.valid) {
      matchedPasswords = passwords['pass1'] === passwords['pass2'];
      updatedItem.valid = matchedPasswords;
      updatedItem.errorMessage = matchPasswordsMessage;
      if(matchedPasswords ) {
        console.log(updatedItems);
        for(let key in updatedItems) {
          if(updatedItems[key].indexPassword) {
            updatedItems[key].valid = true;
            updatedItems[key].errorMessage = '';
          }
        }
        updatedItem.errorMessage = '';
      }
    }
    updatedItems[itemId] = updatedItem;
    let formIsValid = true;
    for(let key in updatedItems) {
      formIsValid = updatedItems[key].valid && formIsValid;
    }
    this.setState({
      [type]: {
        ...this.state[type],
        controls: updatedItems,
        formIsValid,
        passwords: type === 'signUpForm' ? passwords : null
      }
    });
  };
  render() {
    const formElements = [];
    const formObj = this.state.signUpActive ? this.state.signUpForm.controls : this.state.signInForm.controls;
    for(let key in formObj) {
      formElements.push({
        id: key,
        ...formObj[key]
      });
    }
    return (
      <Asx>
        <header>
          <Logo className={classes.Auth__logo}/>
        </header>
        <main>
          {this.props.token ? <Redirect to="/tasks"/> : null}
          <Switch>
            <Route path="/auth" exact render={() => (
              <AuthForm
                {...this.state.signInForm}
                error={this.props.loginError}
                loading={this.props.loading}
                changed={this.inputChangeHandler}
                submit={this.signInHandler}
                type="signInForm"
              />
            )}/>
            <Route path="/auth/sign_up" render={() => (
              <AuthForm
                {...this.state.signUpForm}
                error={this.props.authError}
                loading={this.props.loading}
                changed={this.inputChangeHandler}
                submit={this.signUpHandler}
                type="signUpForm"
              />
            )}/>
            <Route path="/auth/reset" render={() => (
              <AuthForm
                sentCode={this.props.sentResetCode}
                {...this.state.resetPasswordForm}
                error={this.props.resetPasswordError}
                loading={this.props.loading}
                changed={this.inputChangeHandler}
                submit={this.resetPasswordHandler}
                type="resetPasswordForm"
              />
            )}/>
          </Switch>
        </main>
      </Asx>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    autError: state.auth.authError,
    loginError: state.auth.loginError,
    resetPasswordError: state.auth.resetPasswordError,
    confirmResetError: state.auth.confirmResetPassword,
    token: state.auth.token,
    email: state.auth.email,
    sentResetCode: state.auth.sentResetCode
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (userInfo,login) => dispatch(actions.auth(userInfo,login)),
    onLogin: (userInfo) => dispatch(actions.login(userInfo)),
    // onSwitchForm: () => dispatch(actions.switchForm()),
    onSendResetPasswordCode: (userInfo) => dispatch(actions.sendResetPassword(userInfo))
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Auth));