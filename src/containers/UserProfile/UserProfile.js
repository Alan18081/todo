import React, {Component} from 'react';
import {connect} from 'react-redux';

import {checkValidity} from '../../helpers/helpers';
import classes from './UserProfile.sass';
import * as actions from '../../store/actions/index';

import Layout from '../../hoc/Layout/Layout';
import UserAvatar from '../../components/UserProfile/UserAvatar/UserAvatar';
import UserData from '../../components/UserProfile/UserData/UserData';
import UserTokenDisplay from '../../components/UserProfile/UserTokenDisplay/UserTokenDisplay';
import ChangePassword from '../../components/UserProfile/ChangePassword/ChangePassword';
import VerifyEmail from '../../components/UserProfile/VerifyEmail/VerifyEmail';
import Input from '../../components/UI/Input/Input';
import DeleteAccount from '../../components/UserProfile/DeleteAccount/DeleteAccount';
import Spinner from '../../components/UI/Spinner/Spinner';

class UserProfile extends Component {
  state = {
    formPassword: {
      controls: {
        newPassword: {
          elemType: 'input',
          elemConfig: {
            type: 'password',
            placeholder: 'New password'
          },
          value: '',
          validation: {
            rules: {
              required: true,
              minLength: 6
            },
            messages: {
              required: 'You should fill this field',
              minLength: 'Your new password should have at least 6 characters'
            }
          },
          errorMessage: '',
          valid: false,
          touched: false
        }
      },
      formIsValid: false
    },
    userInfo: {
      controls: {
        name: {
          editing: false,
          big: true,
          elemType: 'input',
          elemConfig: {
            type: 'text',
            placeholder: 'username'
          },
          value: this.props.name,
          validation: {
            rules: {
              required: true,
              minLength: 4
            },
            messages: {
              required: 'You should fill this field',
              minLength: 'Username should have at least 4 characters'
            }
          },
          errorMessage: '',
          valid: true,
          touched: false
        },
        email: {
          editing: false,
          elemType: 'input',
          elemConfig: {
            type: 'email',
            placeholder: 'Email'
          },
          value: this.props.email,
          validation: {
            rules: {
              required: true,
              email: /[a-z0-9]+@[a-z0-9]+\.[a-z]/
            },
            messages: {
              required: 'You should fill this field',
              email: 'Write email properly'
            }
          },
          errorMessage: '',
          valid: true,
          touched: false
        }
      }
    },
    userImage: {
      controls: {
        path: {
          elemType: 'input',
          elemConfig: {
            type: 'text',
            placeholder: 'Path to avatar'
          },
          value: this.props.name,
          validation: {
            rules: {
              required: true,
              path: /https?:\/\/+/
            },
            messages: {
              required: 'You should fill this field',
              path: 'Your path should contain http or https prefix'
            }
          },
          errorMessage: '',
          valid: true,
          touched: false
        }
      },
      formIsValid: false
    },
    deleteModalShown: false,
    imageFormShown: false
  };
  toggleDeleteModalHandler = () => {
    this.setState({
      deleteModalShown: !this.state.deleteModalShown
    });
  };
  onEditHandler = (type) => {
    this.setState({
      userInfo: {
        controls: {
          ...this.state.userInfo.controls,
          [type] : {
            ...this.state.userInfo.controls[type],
            editing: true
          }
        }
      }
    })
  };
  offEditHandler = (type) => {
    const valid = this.state.userInfo.controls[type].valid;
    if(valid) {
      this.setState({
        userInfo: {
          controls: {
            ...this.state.userInfo.controls,
            [type] : {
              ...this.state.userInfo.controls[type],
              editing: false
            }
          }
        }
      });
      this.props.onSaveUserInfo(type,this.state.userInfo.controls[type].value,this.props.token);
    }
  };

  deleteAccountHandler = () => {
    this.props.onDeleteAccount();
  };

  sendVerificationCodeHandler = () => {
    this.props.onSendVerificationCode(this.props.token);
    this.setState({
      sentCode: true
    })
  };

  inputHandler = (type,field,value) => {
    const updatedItems  = {...this.state[type].controls};
    const updatedItem = {...updatedItems[field]};
    updatedItem.touched = true;
    updatedItem.value = value;
    const validResult = checkValidity(value,updatedItem.validation);
    updatedItem.valid = validResult.valid;
    updatedItem.errorMessage = validResult.message;
    updatedItems[field] = updatedItem;
    let formIsValid = true;
    if(type === 'formPassword') {
      for(let key in updatedItems) {
        formIsValid = updatedItems[key].valid && formIsValid;
      }
    }
    this.setState({
      [type]: {
        ...this.state[type],
        controls: updatedItems,
        formIsValid
      }
    });
  };

  submitPasswordHandler = (event) => {
    event.preventDefault();
    const newPassword = this.state.formPassword.controls.newPassword.value;
    this.props.onChangePassword(this.props.token,newPassword);
  };

  setAutoRefreshTokenHandler = () => {
    this.props.onSetAutoRefresh();
  };

  uploadImageHandler = (event) => {
    event.preventDefault();
    this.setState({
      imageFormShown: false
    });
    this.props.onSaveUserInfo('image',this.state.userImage.controls.path.value,this.props.token);
  };

  toggleImageInputHandler = () => {
    this.setState(prevState => {
      return {
        imageFormShown: !prevState.imageFormShown,
        userImage: {
          ...prevState.userImage,
          controls: {
            path: {
              ...prevState.userImage.controls.path,
              errorMessage: '',
              touched: false
            }
          }
        }
      }
    });
  };
  inputPathHandler = (value) => {
    const updatedItem  = {...this.state.userImage.controls.path};
    updatedItem.touched = true;
    updatedItem.value = value;
    const validResult = checkValidity(value,updatedItem.validation);
    updatedItem.valid = validResult.valid;
    updatedItem.errorMessage = validResult.message;

    const formIsValid = validResult.valid;

    this.setState({
      userImage: {
        controls: {
          path: {
            ...updatedItem
          }
        },
        formIsValid
      }
    });
  };
  render() {
    const formPasswordControls = [];
    for(let key in this.state.formPassword.controls) {
      formPasswordControls.push({
        id: key,
        ...this.state.formPassword.controls[key]
      });
    }
    const verifyEmailComponent = (
      <div className={classes.UserProfile__leftColumn + ' ' + classes.UserProfile__leftColumn_email}>
        <VerifyEmail
          error={this.props.sendVerificationError}
          sendCodeHandler={this.sendVerificationCodeHandler}
          sentCode={this.props.sentCode}
        />
      </div>
    );
    let userContent = (
      <div className={classes.UserProfile}>
        <div className={classes.UserProfile__row}>
          <div
            className={classes.UserProfile__leftColumn + ' ' + classes.UserProfile__leftColumn_avatar}
          >
            <UserAvatar
              image={this.props.photoUrl}
              shown={this.state.imageFormShown}
              showImageInput={this.toggleImageInputHandler}
              changedPath={this.inputPathHandler}
              config={this.state.userImage.controls.path}
              upload={this.uploadImageHandler}
              isValid={this.state.userImage.formIsValid}
            />
          </div>
          <div className={classes.UserProfile__rightColumn + ' ' + classes.UserProfile__rightColumn_info}>
            <UserData
              value={{name: this.props.name, email: this.props.email}}
              config={this.state.userInfo}
              onInput={this.inputHandler}
              offEdit={this.offEditHandler}
              onEdit={this.onEditHandler}
            />
            <UserTokenDisplay
              checked={this.props.autoRefresh}
              setAutoRefreshToken={this.setAutoRefreshTokenHandler}
              clicked={this.props.onRefreshUserToken}
              time={localStorage.getItem('expires')}/>
          </div>
        </div>
        <div className={classes.UserProfile__row}>
          {!this.props.emailVerified && !this.props.sentVerificationCode ? verifyEmailComponent : null}
          <div className={classes.UserProfile__rightColumn + ' ' + classes.UserProfile__leftColumn_password}>
            <ChangePassword
              submit={this.submitPasswordHandler}
              btnActive={this.state.formPassword.formIsValid}
              error={this.props.changePasswordError}
            >
              {formPasswordControls.map(formElem => (
                <Input
                  changed={event => this.inputHandler('formPassword',formElem.id,event.target.value)}
                  key={formElem.id}
                  elemType={formElem.elemType}
                  config={formElem.elemConfig}
                  errorMessage={formElem.errorMessage}
                />
              ))}
            </ChangePassword>
          </div>
        </div>
        <div className={classes.UserProfile__row}>
          <div className={classes.UserProfile__leftColumn + ' ' + classes.UserProfile__leftColumn_delete}>
            <DeleteAccount
              clicked={this.toggleDeleteModalHandler}
              shown={this.state.deleteModalShown}
              deleteAccount={this.deleteAccountHandler}
              error={this.props.deleteAccountError}
            />
          </div>
        </div>
      </div>
    );
    if(this.props.loading) {
      userContent = <Spinner/>
    }
    return (
      <Layout>
        {userContent}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.profile.name,
    email: state.profile.email,
    token: state.auth.token,
    emailVerified: state.profile.emailVerified,
    loading: state.profile.loading,
    sentCode: state.profile.sentVerificationCode,
    autoRefresh: state.auth.autoRefresh,
    deleteAccountError: state.auth.deleteAccountError,
    changePasswordError: state.profile.changePasswordError,
    sendVerificationError: state.profile.sendVerificationError,
    photoUrl:state.profile.image
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveUserInfo: (field,value,token) => dispatch(actions.saveUserInfo(field,value,token)),
    onRefreshUserToken: () => dispatch(actions.refreshUserToken()),
    onDeleteAccount: () => dispatch(actions.deleteAccount()),
    onSendVerificationCode: (token) => dispatch(actions.sendVerificationCode(token)),
    onChangePassword: (token,password) => dispatch(actions.changePassword(token,password)),
    onSetAutoRefresh: () => dispatch(actions.autoRefreshToken())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);