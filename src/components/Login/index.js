import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

export default class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  //   submitLogin = e => {
  //     e.preventDefault()
  //   }

  getUserName = e => {
    this.setState({username: e.target.value})
  }

  getPassword = e => {
    this.setState({password: e.target.value})
  }

  submitDetails = e => {
    e.preventDefault()
    this.verifyUserDetails()
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = error => {
    this.setState({errorMsg: error, isError: true})
  }

  verifyUserDetails = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else if (response.status !== 200) {
      this.onFailure(data.error_msg)
    }
    console.log(username, password)
    console.log(data)
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {isError, errorMsg} = this.state
    console.log(errorMsg)
    return (
      <div className="loginContainer">
        <div className="logincard">
          <div className="imageCard">
            <img
              className="jobbylogo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <div>
            <form onSubmit={this.submitDetails}>
              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                onChange={this.getUserName}
                id="username"
                type="text"
                placeholder="Username"
              />
              <br />
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                onChange={this.getPassword}
                id="password"
                type="password"
                placeholder="Password"
              />
              <br />
              <button type="submit" className="loginBtn">
                Login
              </button>
            </form>
            {isError ? <p className="error">{errorMsg}</p> : null}
          </div>
        </div>
      </div>
    )
  }
}
