import sun from "../assets/summer-bg.jpg"
import rain from "../assets/rainy-bg.jpg"
import snow from "../assets/winter-bg.jpg"

import sunSound from '../assets/sounds/summer.mp3'
import rainSound from '../assets/sounds/rain.mp3'
import snowSound from '../assets/sounds/winter.mp3'

import sunIcon from '../assets/icons/sun.svg'
import rainIcon from '../assets/icons/cloud-rain.svg'
import snowIcon from '../assets/icons/cloud-snow.svg'

import pauseIcon from '../assets/icons/pause.svg'


interface IWeather {
    id: string,
    picture: string,
    audio: string,
    icon: string,
    pauseIcon: string
}


export const weathers: IWeather[] = [
    {
        id: 'sun',
        picture: sun,
        audio: sunSound,
        icon: sunIcon,
        pauseIcon
    },
    {
        id: 'rain',
        picture: rain,
        audio: rainSound,
        icon: rainIcon,
        pauseIcon
    },
    {
        id: 'snow',
        picture: snow,
        audio: snowSound,
        icon: snowIcon,
        pauseIcon
    }
]