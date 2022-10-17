import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

import './index.css'
import JobItem from '../JobItem'

export default class Jobs extends Component {
  state = {profileData: [], jobsList: [], userAuthorized: ''}

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  retry = () => {
    this.getProfileDetails()
    this.getJobs()
    console.log('retry')
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
    if (response.ok) {
      this.setState({userAuthorized: true})
    } else {
      this.setState({userAuthorized: false})
    }
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
    const updatedData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({jobsList: updatedData})
    console.log(data)
    console.log(updatedData)
  }

  render() {
    const {jobsList, userAuthorized} = this.state
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
                <h1 className="headingText">Type of Employment</h1>
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
                <h1 className="headingText">Salary Range</h1>
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
            <div>
              {userAuthorized ? (
                <ul>
                  {jobsList.map(each => (
                    <JobItem key={each.id} details={each} />
                  ))}
                </ul>
              ) : (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                    alt="failure view"
                  />
                  <h1>Oops! Something Went Wrong</h1>
                  <p>We cannot seem to find the page you are looking for.</p>
                  <button onClick={this.retry}>Retry</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
