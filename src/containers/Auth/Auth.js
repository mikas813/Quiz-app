import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './auth.module.scss';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';


export default class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Please fill in correct email!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Please fill in correct password!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minlength: 6
        }
      }
    }
  };

  loginHandler = () => {

  };
  registerHandler = () => {

  };

  submitHandler = event => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
      isValid = is.email( value ) && isValid;
    }
    if (validation.minlength) {
      isValid = value.trim().length >= validation.minlength && isValid;
    }
    return isValid;
  }


  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    })
  }

  renderInputs() {
    return Object.keys( this.state.formControls ).map( (controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler( event, controlName )}
        />
      );
    } );
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Login</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>

            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Login
            </Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}