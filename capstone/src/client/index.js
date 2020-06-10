import { handleSubmit } from './js/formHandler'
import './styles/styles.scss'
import './styles/fonts.scss'

export {
    handleSubmit,
}

document.getElementById('submit-button').addEventListener('click', handleSubmit)
