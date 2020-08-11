import { reducer, initialState } from './anecdoteReducer'
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
})