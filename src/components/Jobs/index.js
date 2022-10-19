import Header from '../Header'
import JobProfileSection from '../JobProfileSection'
import './index.css'
import JobsFilterGroup from '../JobsFilterGroup'

const Jobs = () => (
  <>
    <Header />
    <div className="job-profile-container">
      <JobProfileSection />
    </div>
  </>
)

export default Jobs
