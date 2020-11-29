import { useState } from 'react'

export const useField = (type, id, placeholder) => {
    const [value, setValue] = useState('')
    
    const onChange = (event) => {
      setValue(event.target.value)  
    }

    const onReset = () => {
        setValue('')
    }

    return {
        id,
        type,
        placeholder,
        value,
        onReset,
        onChange
    }
}