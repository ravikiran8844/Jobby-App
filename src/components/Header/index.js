import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  getLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="navbar">
        <div>
          <Link to="/">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
        <ul className="headerlist">
          <Link to="/">
            <li className="listItems">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="listItems">Jobs</li>
          </Link>

          <li className="listItems">
            <button onClick={this.getLogout} className="logout">
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }
}
export default withRouter(Header)
