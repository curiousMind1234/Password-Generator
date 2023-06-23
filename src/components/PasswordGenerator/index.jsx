import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useState } from 'react'

import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'

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
  const [colors, setColor] = useState('#FF0000')

  const onChangePasswordLength = (value) => {
    setPasswordLength(value)
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
    if (password.length === 0) return

    if (password.length >= 12) {
      setStrength('Strong')
      setColor('#12b40e')
      console.log('color', colors)
    } else if (password.length >= 8 && password.length <= 11) {
      setStrength('Medium')
      setColor('#ffa200')
    } else if (password.length >= 2 && password.length <= 7) {
      setStrength('Weak')
      setColor('#ff0000')
    }
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
    } catch (e) {
      setCopy('Failed')
    }
  }

  const generatePassword = () => {
    const newpassword = []
    const length = passwordLength
    console.log('length:', length)
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={[}]|<?/'

    do {
      const index = Math.floor(Math.random() * characters.length)
      if (upperCase && characters[index] >= 'A' && characters[index] <= 'Z') {
        newpassword.push(characters[index])
      } else if (lowerCase && characters[index] >= 'a' && characters[index] <= 'z') {
        newpassword.push(characters[index])
      } else if (number && characters[index] >= '0' && characters[index] <= '9') {
        newpassword.push(characters[index])
      } else if (specialChar && characters[index] >= '!' && characters[index] <= '/') {
        newpassword.push(characters[index])
      }
    } while (newpassword.length !== length)

    setPassword(newpassword.join(''))
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

      <p style={{ color: `${colors}`, fontWeight: 'bold', marginLeft: '10px', marginTop: '15px' }}>
        {strength}
      </p>
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
