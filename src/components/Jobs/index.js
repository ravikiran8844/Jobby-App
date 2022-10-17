import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

import './index.css'

export default class Jobs extends Component {
  state = {profileData: []}

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    const fetchedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({profileData: fetchedData})
    // console.log(data)
    console.log(fetchedData)
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/jobs', options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div>
        <Header />
        <div className="jobs">
          <div className="sidebar">
            <div className="profile">
              <div>
                <img src={profileImageUrl} alt="profile" />
                <h1 className="profileName">{name}</h1>
                <p className="profileBio">{shortBio}</p>
              </div>
              <hr />
              <div>
                <h1>Type of Employment</h1>
                <div className="inputCard">
                  <input className="checkbox" id="fullTime" type="checkbox" />
                  <label htmlFor="fullTime">Full Time</label>
                </div>
                <div className="inputCard">
                  <input className="checkbox" id="partTime" type="checkbox" />
                  <label htmlFor="partTime">Part Time</label>
                </div>
                <div className="inputCard">
                  <input className="checkbox" id="Freelance" type="checkbox" />
                  <label htmlFor="Freelance">Freelance</label>
                </div>
                <div className="inputCard">
                  <input className="checkbox" id="Internship" type="checkbox" />
                  <label htmlFor="Internship">Internship</label>
                </div>
              </div>
              <hr />
              <div>
                <h1>Salary Range</h1>
                <div className="inputCard">
                  <input
                    className="checkbox"
                    name="salarayRange"
                    id="tenlpa"
                    type="radio"
                  />
                  <label htmlFor="tenlpa">10 LPA and above</label>
                </div>
                <div className="inputCard">
                  <input
                    className="checkbox"
                    name="salarayRange"
                    id="twentylpa"
                    type="radio"
                  />
                  <label htmlFor="twentylpa">20 LPA and above</label>
                </div>
                <div className="inputCard">
                  <input
                    className="checkbox"
                    name="salarayRange"
                    id="thirtylpa"
                    type="radio"
                  />
                  <label htmlFor="thirtylpa">30 LPA and above</label>
                </div>
                <div className="inputCard">
                  <input
                    className="checkbox"
                    name="salarayRange"
                    id="fourtylpa"
                    type="radio"
                  />
                  <label htmlFor="fourtylpa">40 LPA and above</label>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="searchBox">
              <input placeholder="Search" className="searchbar" type="search" />
              <button className="searchbtn" type="button">
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
