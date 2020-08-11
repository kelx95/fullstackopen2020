import { reducer, initialState, getId } from './anecdoteReducer'
import store from '../store'

describe('anecdoteReducer', () => {
    test('return new state when voted', () => {
        console.log(initialState)
        const action = {
            type: 'VOTE',
            data: { id: initialState[0].id }
        }
        //if we uncommet this the votes for initialState[0] would be 2 because we apply twice the action  ..(initialState, action)
        //store.dispatch(action)
        const newState = reducer(initialState, action)
        //console.log(newState)
        expect(newState).toHaveLength(6)
        expect(newState[0].votes).toBe(1)
    })
    test('return new state when a new anecdote gets added', () => {
        const action = {
            type: 'NEW_ANECDOTE',
            data: {
                content: 'test test',
                id: getId(),
                votes: 0
            }
        }
        const newState = reducer(initialState, action)
        console.log(newState)
        expect(newState).toHaveLength(7)
        expect(newState[6].content).toBe('test test')
    })
})