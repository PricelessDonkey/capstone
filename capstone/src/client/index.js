import { handleSubmit } from './js/formHandler'
import { checkInput } from './js/inputHelper'
import img from './media/logo_square.png'
import earth from './media/earth.png'

import './styles/styles.scss'
import './styles/fonts.scss'

document.getElementById('pixabayIcon').src=img
document.getElementById('earth').src = earth

document.getElementById('submit-button').addEventListener('click', handleSubmit)

export {
    checkInput
}