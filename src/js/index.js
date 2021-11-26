import 'normalize.css'
import axios from 'axios'

import '@/styles/index.sass'
import logo from '@/assets/logo.svg'

class MyName {
  constructor (name){
    this.name = name
  }
  async readMyName() {
    // 測 api 用這裡測
    const { data } = await axios.get('/api/group')
    console.log(data)
  }
}

function setImage() {
  const target = document.querySelector('#image')
  const img = document.createElement('img')
  img.setAttribute('src', logo)
  target.appendChild(img)
}

window.addEventListener('DOMContentLoaded', setImage)

const me = new MyName('eason')

console.log(me.readMyName())
