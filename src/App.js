import logo from './logo.svg';
import './App.css';
import ServiceStatusSummary from './ServiceStatusSummary'
import TaskDashboard from './TaskDashboard';
import FeedStatusDashboard from './FeedStatusDashboard';
import JobStatusDashboard from './JobStatusDashboard';
import MetricsDashboard from './MetricsDashboard';
function App() {

  return (
    <div className="App">
      <div className="App">
        <div style={{ display: 'flex', flexDirection: 'row', margin: '44px' }}>
          <ServiceStatusSummary style={{ marginRight: '16px' }} />
          <FeedStatusDashboard />
        </div>
        <JobStatusDashboard style={{ margin: '16px' }} />
        <TaskDashboard style={{ margin: '16px' }} />
        <MetricsDashboard style={{ margin: '16px' }} />
      </div>
    </div>
  );
}

export default App;
