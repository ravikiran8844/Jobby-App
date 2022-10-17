import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

export default class JobItemDetails extends Component {
  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <div>
        <Header />
        {/* <div>
          <div>
            <img src={companyLogoUrl} alt="company logo" />
          </div>
          <div>
            <h1>{title}</h1>
            <p>rating</p>
          </div>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
          <hr />
          <div>
            <p>Description</p>
            <p>{jobDescription}</p>
          </div>
        </div> */}
      </div>
    )
  }
}
