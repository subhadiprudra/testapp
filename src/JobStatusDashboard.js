import React, { PureComponent } from 'react';

class JobStatusDashboard extends PureComponent {
  constructor(props) {
    super(props);
    
    // State initialization
    this.state = {
      selectedStatus: null,
      showModal: false,
      isLoading: false,
      jobDetails: {},
      
      // Sample data - without job_details initially
      data: {
        "summery": {
            "running": 10,
            "on_hold": 2,
            "failed": 3,
            "terminated": 2
        },
        "job_status":{
            "phase1 Pr1":{
                "calypso":"completed",
                "gmi":"running",
                "brodridge":"complted",
                "opics":"failed",
                "fx calypso":"activated"
            },
            "phase1 PLA":{
                "calypso":"running",
                "gmi":"running",
                "brodridge":"complted",
                "opics":"failed"
            },
            "phase2 Pr1":{
                "calypso":"completed",
                "gmi":"running",
                "brodridge":"complted",
                "opics":"failed"
            },
            "phase2 Pr2":{
                "calypso":"completed",
                "gmi":"running",
                "brodridge":"complted",
                "opics":"failed"
            },
            "phase2 PLA":{
                "calypso":"running",
                "gmi":"running",
                "brodridge":"complted",
                "opics":"failed"
            }
        }
      }
    };

    // Status colors
    this.statusColors = {
      completed: '#10B981', // green
      complted: '#10B981',  // green (handling typo)
      running: '#3B82F6',   // blue
      failed: '#EF4444',    // red
      on_hold: '#F59E0B',   // yellow
      terminated: '#6B7280', // gray
      default: '#A78BFA'     // purple (for any unknown status)
    };

    // Mock data for network calls
    this.mockJobDetails = {
      "running": [
        { id: "JOB-001", name: "Data Processing", phase: "phase1 PLA", system: "calypso", startTime: "2025-03-22T08:30:00", lastUpdate: "2025-03-22T09:45:00" },
        { id: "JOB-002", name: "Report Generation", phase: "phase1 Pr1", system: "gmi", startTime: "2025-03-22T08:45:00", lastUpdate: "2025-03-22T09:30:00" },
        { id: "JOB-003", name: "Data Import", phase: "phase2 Pr1", system: "gmi", startTime: "2025-03-22T09:00:00", lastUpdate: "2025-03-22T10:15:00" },
        { id: "JOB-004", name: "API Integration", phase: "phase2 Pr2", system: "gmi", startTime: "2025-03-22T07:15:00", lastUpdate: "2025-03-22T09:50:00" },
        { id: "JOB-005", name: "Database Sync", phase: "phase2 PLA", system: "calypso", startTime: "2025-03-22T08:10:00", lastUpdate: "2025-03-22T09:40:00" },
        { id: "JOB-006", name: "Cache Update", phase: "phase2 PLA", system: "gmi", startTime: "2025-03-22T08:00:00", lastUpdate: "2025-03-22T10:00:00" },
        { id: "JOB-007", name: "Data Export", phase: "phase1 PLA", system: "gmi", startTime: "2025-03-22T09:20:00", lastUpdate: "2025-03-22T10:10:00" },
        { id: "JOB-008", name: "Log Cleanup", phase: "phase1 Pr1", system: "calypso", startTime: "2025-03-22T07:45:00", lastUpdate: "2025-03-22T09:30:00" },
        { id: "JOB-009", name: "Index Rebuild", phase: "phase2 PLA", system: "gmi", startTime: "2025-03-22T08:30:00", lastUpdate: "2025-03-22T10:20:00" },
        { id: "JOB-010", name: "Config Update", phase: "phase1 PLA", system: "calypso", startTime: "2025-03-22T09:00:00", lastUpdate: "2025-03-22T10:00:00" }
      ],
      "on_hold": [
        { id: "JOB-011", name: "Resource Allocation", phase: "phase1 Pr1", system: "opics", startTime: "2025-03-22T08:15:00", lastUpdate: "2025-03-22T09:00:00" },
        { id: "JOB-012", name: "Task Scheduling", phase: "phase2 Pr2", system: "brodridge", startTime: "2025-03-22T08:30:00", lastUpdate: "2025-03-22T09:15:00" }
      ],
      "failed": [
        { id: "JOB-013", name: "Transaction Processing", phase: "phase1 Pr1", system: "opics", startTime: "2025-03-22T07:30:00", lastUpdate: "2025-03-22T08:45:00" },
        { id: "JOB-014", name: "Report Generation", phase: "phase1 PLA", system: "opics", startTime: "2025-03-22T09:00:00", lastUpdate: "2025-03-22T09:30:00" },
        { id: "JOB-015", name: "Data Validation", phase: "phase2 Pr1", system: "opics", startTime: "2025-03-22T08:45:00", lastUpdate: "2025-03-22T09:15:00" }
      ],
      "terminated": [
        { id: "JOB-016", name: "Legacy Import", phase: "phase2 Pr2", system: "opics", startTime: "2025-03-22T07:00:00", lastUpdate: "2025-03-22T08:30:00" },
        { id: "JOB-017", name: "Backup Process", phase: "phase2 PLA", system: "brodridge", startTime: "2025-03-22T08:00:00", lastUpdate: "2025-03-22T09:00:00" }
      ]
    };

    // Bind methods
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getCardStyle = this.getCardStyle.bind(this);
    this.renderStatusIndicator = this.renderStatusIndicator.bind(this);
    this.fetchJobDetails = this.fetchJobDetails.bind(this);
  }

  // Method to fetch job details and open modal
  openModal(status) {
    this.setState({
      selectedStatus: status,
      showModal: true,
      isLoading: true
    });
    
    // Fetch job details
    this.fetchJobDetails(status);
  }

  // Method to simulate network call to fetch job details
  fetchJobDetails(status) {
    // Check if we already have the data
    if (this.state.jobDetails[status]) {
      this.setState({ isLoading: false });
      return;
    }
    
    // Simulate network delay
    setTimeout(() => {
      // For known statuses, use our mock data
      if (this.mockJobDetails[status]) {
        const newJobDetails = {...this.state.jobDetails};
        newJobDetails[status] = [...this.mockJobDetails[status]];
        
        this.setState({
          jobDetails: newJobDetails,
          isLoading: false
        });
      } else {
        // For unknown statuses, create generic data
        const newJobDetails = {...this.state.jobDetails};
        
        // Generate mock data for unknown status
        newJobDetails[status] = this.generateMockJobsForStatus(status, 
          Math.floor(Math.random() * 5) + 1); // Random number of jobs between 1-5
        
        this.setState({
          jobDetails: newJobDetails,
          isLoading: false
        });
      }
    }, 800); // Simulate a network delay of 800ms
  }
  
  // Generate mock job data for unknown statuses
  generateMockJobsForStatus(status, count) {
    const jobs = [];
    
    // Get system names dynamically from the data
    const systemNames = new Set();
    Object.values(this.state.data.job_status).forEach(phase => {
      Object.keys(phase).forEach(system => {
        systemNames.add(system);
      });
    });
    const systems = Array.from(systemNames);
    
    // Get phase names from the data
    const phases = Object.keys(this.state.data.job_status);
    
    for (let i = 0; i < count; i++) {
      // Generate random time within the last 3 hours
      const startTime = new Date();
      startTime.setHours(startTime.getHours() - Math.random() * 3);
      
      // Generate last update time after start time
      const lastUpdate = new Date(startTime);
      lastUpdate.setMinutes(lastUpdate.getMinutes() + Math.floor(Math.random() * 60) + 15);
      
      jobs.push({
        id: `JOB-${Math.floor(Math.random() * 1000)}`,
        name: `${status.charAt(0).toUpperCase() + status.slice(1)} Task ${i + 1}`,
        phase: phases[Math.floor(Math.random() * phases.length)],
        system: systems[Math.floor(Math.random() * systems.length)],
        startTime: startTime.toISOString(),
        lastUpdate: lastUpdate.toISOString()
      });
    }
    
    return jobs;
  }

  // Method to close modal
  closeModal() {
    this.setState({
      showModal: false
    });
  }

  // Status indicator component
  renderStatusIndicator(status) {
    const normalizedStatus = status.toLowerCase();
    const color = this.statusColors[normalizedStatus] || this.statusColors.default;
    
    return (
      <div style={this.styles.statusIndicator}>
        <div style={{...this.styles.statusIndicatorDot, backgroundColor: color}}></div>
        <span style={this.styles.statusLabel}>
          {normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)}
        </span>
      </div>
    );
  }

  // Function to get card style based on status
  getCardStyle(status) {
    let cardStyle = {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '6px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      borderLeftWidth: '4px',
      borderLeftStyle: 'solid'
    };

    let valueStyle = {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333'
    };

    switch (status) {
      case 'running':
        cardStyle.borderLeftColor = '#3b82f6';
        cardStyle.backgroundColor = '#eff6ff';
        valueStyle.color = '#1e40af';
        break;
      case 'on_hold':
        cardStyle.borderLeftColor = '#f59e0b';
        cardStyle.backgroundColor = '#fef3c7';
        valueStyle.color = '#92400e';
        break;
      case 'failed':
        cardStyle.borderLeftColor = '#ef4444';
        cardStyle.backgroundColor = '#fee2e2';
        valueStyle.color = '#991b1b';
        break;
      case 'terminated':
        cardStyle.borderLeftColor = '#6b7280';
        cardStyle.backgroundColor = '#f3f4f6';
        valueStyle.color = '#4b5563';
        break;
      default:
        // Default for any unknown status
        cardStyle.borderLeftColor = '#a78bfa';
        cardStyle.backgroundColor = '#f5f3ff';
        valueStyle.color = '#6d28d9';
    }

    return { cardStyle, valueStyle };
  }

  // Render method
  render() {
    const { data, selectedStatus, showModal, isLoading, jobDetails } = this.state;
    const hasFailedJobs = data.summery.failed > 0;
    
    // Dynamically get all unique system names from the job_status data
    const systemNames = new Set();
    Object.values(data.job_status).forEach(phase => {
      Object.keys(phase).forEach(system => {
        systemNames.add(system);
      });
    });
    
    // Convert to array and sort alphabetically
    const systems = Array.from(systemNames).sort();

    // CSS styles
    this.styles = {
      dashboard: {
        backgroundColor: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: '0 auto'
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        padding: '12px',
        backgroundColor: 'white',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      },
      title: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#333',
        margin: 0
      },
      overallStatus: {
        display: 'flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: '999px',
        fontWeight: 'bold',
        backgroundColor: hasFailedJobs ? '#fee2e2' : '#d1fae5',
        color: hasFailedJobs ? '#b91c1c' : '#047857'
      },
      statusDot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginRight: '8px',
        backgroundColor: hasFailedJobs ? '#ef4444' : '#10b981'
      },
      summaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '16px'
      },
      tableContainer: {
        backgroundColor: 'white',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left'
      },
      tableHeader: {
        backgroundColor: '#f9fafb',
        padding: '8px 12px',
        fontSize: '12px',
        textTransform: 'uppercase',
        color: '#6b7280',
        fontWeight: '600',
        letterSpacing: '0.05em'
      },
      tableCell: {
        padding: '8px 12px',
        borderBottom: '1px solid #e5e7eb'
      },
      phaseCell: {
        fontWeight: '500',
        color: '#374151'
      },
      evenRow: {
        backgroundColor: 'white'
      },
      oddRow: {
        backgroundColor: '#f9fafb'
      },
      statusIndicator: {
        display: 'flex',
        alignItems: 'center'
      },
      statusIndicatorDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        marginRight: '8px'
      },
      statusLabel: {
        fontSize: '14px',
        color: '#4b5563'
      },
      modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
      },
      modalContainer: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto'
      },
      modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #e5e7eb'
      },
      modalTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1f2937',
        margin: 0,
        textTransform: 'capitalize'
      },
      closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        color: '#6b7280',
        cursor: 'pointer',
        padding: 0,
        lineHeight: 1
      },
      modalBody: {
        padding: '16px'
      },
      jobName: {
        fontWeight: '500'
      },
      loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px'
      },
      spinner: {
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderLeft: '4px solid #3b82f6',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        animation: 'spin 1s linear infinite'
      },
      noData: {
        textAlign: 'center',
        padding: '32px',
        color: '#6b7280',
        fontStyle: 'italic'
      }
    };

    return (
      <div style={this.styles.dashboard}>
        {/* Header with overall status */}
        <div style={this.styles.header}>
          <h1 style={this.styles.title}>Job Dashboard</h1>
          <div style={this.styles.overallStatus}>
            <div style={this.styles.statusDot}></div>
            <span>{hasFailedJobs ? 'CRITICAL' : 'HEALTHY'}</span>
          </div>
        </div>
        
        {/* Summary cards */}
        <div style={this.styles.summaryGrid}>
          {Object.entries(data.summery).map(([key, value]) => {
            const { cardStyle, valueStyle } = this.getCardStyle(key);
            
            return (
              <div 
                key={key} 
                style={cardStyle}
                onClick={() => this.openModal(key)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={valueStyle}>{value}</span>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: '500', 
                    color: '#6b7280', 
                    marginTop: '4px' 
                  }}>
                    {key.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Job status table */}
        <div style={this.styles.tableContainer}>
          <table style={this.styles.table}>
            <thead>
              <tr>
                <th style={this.styles.tableHeader}>Phase</th>
                {systems.map(system => (
                  <th key={system} style={this.styles.tableHeader}>
                    {system.charAt(0).toUpperCase() + system.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.job_status).map(([phase, systemData], index) => (
                <tr key={phase} style={index % 2 === 0 ? this.styles.evenRow : this.styles.oddRow}>
                  <td style={{...this.styles.tableCell, ...this.styles.phaseCell}}>{phase}</td>
                  {systems.map(system => (
                    <td key={`${phase}-${system}`} style={this.styles.tableCell}>
                      {systemData[system] ? 
                        this.renderStatusIndicator(systemData[system]) : 
                        this.renderStatusIndicator('unknown')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Job detail modal */}
        {showModal && (
          <div style={this.styles.modalBackdrop}>
            <div style={this.styles.modalContainer}>
              <div style={this.styles.modalHeader}>
                <h2 style={this.styles.modalTitle}>
                  {selectedStatus && `${selectedStatus.replace('_', ' ')} Jobs (${jobDetails[selectedStatus]?.length || 0})`}
                </h2>
                <button 
                  onClick={this.closeModal}
                  style={this.styles.closeButton}
                  onMouseOver={(e) => e.currentTarget.style.color = '#1f2937'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
                >
                  ×
                </button>
              </div>
              <div style={this.styles.modalBody}>
                {isLoading ? (
                  <div style={this.styles.loader}>
                    <div style={this.styles.spinner}></div>
                  </div>
                ) : jobDetails[selectedStatus] ? (
                  <table style={this.styles.table}>
                    <thead>
                      <tr>
                        <th style={this.styles.tableHeader}>Job Name</th>
                        <th style={this.styles.tableHeader}>Start Time</th>
                        <th style={this.styles.tableHeader}>Last Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobDetails[selectedStatus].map((job, idx) => (
                        <tr key={job.id} style={idx % 2 === 0 ? this.styles.evenRow : this.styles.oddRow}>
                          <td style={{...this.styles.tableCell, ...this.styles.jobName}}>{job.name}</td>
                          <td style={this.styles.tableCell}>
                            {new Date(job.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </td>
                          <td style={this.styles.tableCell}>
                            {new Date(job.lastUpdate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={this.styles.noData}>No job data available</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default JobStatusDashboard;