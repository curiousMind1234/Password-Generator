import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useState } from 'react'

import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg'

import './index.css'

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(8)
  const [upperCase, setUpperCase] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [password, setPassword] = useState('')

  const [strength, setStrength] = useState('')
  const [copy, setCopy] = useState('Copy')

  const onChangePasswordLength = (value) => {
    setPasswordLength(value);
    calculateStrength()
  }

  const handleCheckBox = (event) => {
    const value = event.target.checked
    console.log('value in checkBox', value)
    switch (event.target.id) {
      case 'uppercase':
        setUpperCase(value)
        break

      case 'lowercase':
        setLowerCase(value)
        break

      case 'numbers':
        setNumber(value)
        break

      case 'special chars':
        setSpecialChar(value)
        break

      default:
        console.log('in default case')
    }
  }

  const calculateStrength = () => {
    if (upperCase && lowerCase && number && specialChar && password.length <= 14) {
      setStrength('Strong')
    } else if (
      upperCase &&
      lowerCase &&
      specialChar &&
      password.length >= 8 &&
      password.length <= 13
    ) {
      setStrength('Medium')
    } else if (upperCase && password.length >= 5 && password.length <= 7) {
      setStrength('Weak')
    }
    console.log('strength:', strength)
  }

  async function copyContent() {
    try {
      if (password.length === 0) {
        setCopy('Copy')
        setStrength('Password is empty choose the correct filter and generate')
        setTimeout(() => {
          setStrength('')
        }, 2000)
        return
      }
      await navigator.clipboard.writeText(password)
      setCopy('Copied')
      setTimeout(() => {
        setCopy('Copy')
      }, 2000)
      console.log('copy text:', copy)
    } catch (e) {
      setCopy('Failed')
    }
  }

  const generatePassword = () => {
    const password = []
    const length = passwordLength
    console.log('lenght:', length)
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={[}]|<?/'

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length)
      if (upperCase && characters[index] >= 'A' && characters[index] <= 'Z') {
        password.push(characters[index])
      } else if (lowerCase && characters[index] >= 'a' && characters[index] <= 'z') {
        password.push(characters[index])
      } else if (number && characters[index] >= '0' && characters[index] <= '9') {
        password.push(characters[index])
      } else if (specialChar && characters[index] >= '!' && characters[index] <= '/') {
        password.push(characters[index])
      }
    }
    setPassword(password.join(''))
    calculateStrength()
  }

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="Password" value={password} onChange={generatePassword} />
        </div>
        <button className="copy-btn" onClick={copyContent} value={copy}>
          <Copy /> {copy}
        </button>
      </div>
      <span>{}</span>
      <span className="fw-500">{strength}</span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>

      <div className="checkbox-wrapper">
        <input
          className="inputcheck"
          type="checkbox"
          name="upperCase"
          id="uppercase"
          onChange={handleCheckBox}
          checked={upperCase}
          value={upperCase}
        />
        <label> UpperCase </label>
        <input
          type="checkbox"
          name="lowerCase"
          id="lowercase"
          onChange={handleCheckBox}
          checked={lowerCase}
          value={lowerCase}
        />
        <label> Lowercase </label>
        <input
          type="checkbox"
          name="numbers"
          id="numbers"
          onChange={handleCheckBox}
          checked={number}
        />
        <label> Numbers </label>
        <input
          type="checkbox"
          name="specialChars"
          id="special chars"
          onChange={handleCheckBox}
          checked={specialChar}
        />
        <label> Special Charcters </label>
      </div>

      <button className="generate-btn" onClick={() => generatePassword()}>
        Generate Password
      </button>
    </div>
  )
}

export default PasswordGenerator
