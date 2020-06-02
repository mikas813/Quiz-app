import React, {Component} from 'react';
import classes from './quizCreator.module.scss';
import './quizCreator.module.scss';
import Button from '../../components/UI/Button/Button';
import {createControl} from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Select from '../../components/UI/Select/Select';


function createOptionControl(number) {
  return createControl( {
    label: `Option ${number}`,
    id: number,
    errorMessage: 'Answer can\'t be empty'
  }, {required: true} );
}

function creaFormControls() {
  return {
    question: createControl( {
      label: 'Fill in your question',
      errorMessage: 'Question can\'t be empty'
    }, {required: true} ),
    option1: createOptionControl( 1 ),
    option2: createOptionControl( 2 ),
    option3: createOptionControl( 3 ),
    option4: createOptionControl( 4 )
  };
}

export default class QuizCreator extends Component {

  state = {
    quiz: [],
    rightAnswerId: 1,
    formControls: creaFormControls()
  };


  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = () => {

  };

  createQuizHandler = () => {

  };

  changeHandler = () => {

  };

  selectChangeHandler = (event) => {
    this.setState( {
      rightAnswerId: +event.target.value
    } );

  };

  renderControls = () => {
    return Object.keys( this.state.formControls ).map( (controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxilary
          key={controlName + index}
        >
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler( event.target.value, controlName )}
          />
          {index === 0 ? <hr/> : null}
        </Auxilary>
      );
    } );
  };

  render() {
    const select = <Select
      label="Chose correct answer"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />;

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
            >
              Add question
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
            >
              Create test
            </Button>
          </form>
        </div>
      </div>

    );
  }
}