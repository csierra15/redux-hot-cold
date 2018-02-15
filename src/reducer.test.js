import reducer from './reducer'
import {restartGame, makeGuess, generateAuralUpdate} from './actions'

describe('reducer', () => {
  it('should set initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'})
    expect(state.guesses).toEqual([])
    expect(state.feedback).toEqual('Make your guess!')
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0)
    expect(state.correctAnswer).toBeLessThanOrEqual(100)
    expect(state.auralStatus).toEqual('')
  })

  it('should return current state on unknown action', () => {
    let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
  })

  describe('restartGame', () => {
    it('should restart the game', () => {
      let state
      let correctAnswer = 10
      state = reducer(state, restartGame(correctAnswer))
      expect(state.guesses).toEqual([])
      expect(state.feedback).toEqual('Make your guess!')
      expect(state.correctAnswer).toBeGreaterThanOrEqual(0)
      expect(state.correctAnswer).toBeLessThanOrEqual(100)
      expect(state.auralStatus).toEqual('')
    })
  })

  describe ('makeGuess', () => {
    it('should give correct feedback on guess', () => {
      let state = {
        guesses: [10, 15, 20],
        correctAnswer: 95
      }
      state = reducer(state, makeGuess(25))
      expect(state.guesses).toEqual([10, 15, 20, 25])
      expect(state.feedback).toEqual('You\'re Ice Cold...')
    })
  })

  describe('generateAuralUpdate', () => {
    it('should give aural feedback', () => {
      let state = {
        guesses: [10, 20, 30],
        feedback: 'You\'re Hot!',
        correctAnswer: 35
      }
      state = reducer(state, generateAuralUpdate());
      expect(state.auralStatus).toEqual("Here's the status of the game right now: You're Hot! You've made 3 guesses. In order of most- to least-recent, they are: 30, 20, 10")
    })
  })
})
