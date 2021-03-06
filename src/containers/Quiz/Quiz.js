import React, {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActeveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                rightAnswerId: 2,
                id: 1,
                question: 'What color is sky?',
                answers: [
                    {text: 'Black', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Green', id: 3},
                    {text: 'Red', id: 4}
                ]
            },
            {
                rightAnswerId: 3,
                id: 2,
                question: 'In what year was founded Lisbon?',
                answers: [
                    {text: '1222', id: 1},
                    {text: '1232', id: 2},
                    {text: '1143', id: 3},
                    {text: '1234', id: 4}
                ]
            }
        ]
    };

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys( this.state.answerState )[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState( {
                answerState: {[answerId]: 'success'},
                results
            } );
            const timeout = window.setTimeout( () => {

                if (this.isQuizFinished()) {
                    this.setState( {
                        isFinished: true
                    } );
                } else {
                    this.setState( {
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    } );
                }

                window.clearTimeout( timeout )
            }, 1000 );
        } else {
            results[question.id] = 'error';

            this.setState( {
                answerState: {[answerId]: 'error'},
                results
            } );
        }
    };


    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}

        })
    };

    componentDidMount() {
        console.log('Quiz ID = ', this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer this questions!</h1>

                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                                results={this.state.results}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz