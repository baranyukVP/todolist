import { useState } from 'react'


const useReducerState = (initialState) => {
  const [ state, _setState ] = useState(initialState)

  const setState = (value) =>
    _setState((prevState) => ({ ...prevState, ...(typeof value === 'function' ? value(prevState) : value) }))

  return [ state, setState ]
}


export default useReducerState