import React from 'react'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details
  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobItems">
        <div>
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
        </div>
      </li>
    </Link>
  )
}
export default JobItem
