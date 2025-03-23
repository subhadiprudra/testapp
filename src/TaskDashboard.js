import React, { PureComponent } from 'react';

class TaskDashboard extends PureComponent {
  constructor(props) {
    super(props);
    
    // Sample data
    this.data = {
      "toatl_tasks": 343,
      "completed": 200,
      "currentstatus": {
          "running": 10,
          "completed_with_error": 4,
          "submitted": 10
      },
      "data_center": {
          "cloud": 7,
          "on_prame": 3
      },
      "running": [
          {
              "task_name": "task1",
              "child_task_running": 5,
              "child_task_completed": 10,
              "child_task_with_error": 5,
              "child_task_onqueue": 10
          },
          {
              "task_name": "task2",
              "child_task_running": 10,
              "child_task_completed": 15,
              "child_task_with_error": 5,
              "child_task_onqueue": 10
          }
      ]
    };
    
    // Define styles
    this.styles = {
      container: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        marginBottom: '16px',
        cursor: 'pointer',
        border: '1px solid #e5e5e5',
        transition: 'border-color 0.2s ease',
        width:'90%',
        marginLeft :'3%',
        marginTop:'50px'
      },
      statusBadge: {
        display: 'inline-block',
        padding: '6px 12px',
        borderRadius: '16px',
        fontWeight: 'bold',
        fontSize: '14px',
        marginLeft: '12px'
      },
      statusGood: {
        backgroundColor: '#d1fae5',
        color: '#065f46'
      },
      statusBad: {
        backgroundColor: '#fee2e2',
        color: '#b91c1c'
      },
      card: {
        backgroundColor: 'white',
       // borderRadius: '8px',
      //  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      },
      cardContent: {
        padding: '24px'
      },
      sectionTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '24px'
      },
      progressContainer: {
        marginBottom: '32px'
      },
      progressHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      },
      progressLabel: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#555'
      },
      progressBarContainer: {
        width: '100%',
        height: '16px',
        backgroundColor: '#e0e0e0',
        borderRadius: '9999px'
      },
      progressBar: {
        height: '100%',
        backgroundColor: '#3b82f6',
        borderRadius: '9999px'
      },
      statusGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      },
      statusBox: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px'
      },
      metricsContainer: {
        display: 'flex',
        justifyContent: 'space-around'
      },
      metricItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      metricLabel: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '4px'
      },
      metricValue: {
        fontSize: '20px',
        fontWeight: '500'
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px'
      },
      tableHeader: {
        backgroundColor: '#f9fafb',
        textAlign: 'left'
      },
      tableHeaderCell: {
        padding: '12px',
        fontWeight: '500'
      },
      tableBody: {
        borderTop: '1px solid #e5e7eb'
      },
      tableRow: {
        borderBottom: '1px solid #e5e7eb'
      },
      tableCell: {
        padding: '12px'
      },
      tableCellCenter: {
        padding: '12px',
        textAlign: 'center'
      },
      progressBarRow: {
        width: '100%',
        height: '8px',
        backgroundColor: '#e0e0e0',
        borderRadius: '9999px',
        display: 'flex',
        overflow: 'hidden'
      },
      progressSegmentCompleted: {
        height: '100%',
        backgroundColor: '#22c55e'
      },
      progressSegmentRunning: {
        height: '100%',
        backgroundColor: '#3b82f6'
      },
      progressSegmentError: {
        height: '100%',
        backgroundColor: '#ef4444'
      },
      progressSegmentQueue: {
        height: '100%',
        backgroundColor: '#eab308'
      }
    };
  }
  
  // Helper methods
  calculateCompletionPercentage() {
    return Math.round((this.data.completed / this.data.toatl_tasks) * 100);
  }
  
  determineOverallStatus() {
    const hasErrors = this.data.currentstatus.completed_with_error > 0 || 
                     this.data.running.some(task => task.child_task_with_error > 0);
    return hasErrors ? 'Bad' : 'Good';
  }
  
  renderHeader() {
    const overallStatus = this.determineOverallStatus();
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{...this.styles.sectionTitle, margin: 0}}>Task Management Dashboard</h2>
        <span 
          style={{
            ...this.styles.statusBadge, 
            ...(overallStatus === 'Good' ? this.styles.statusGood : this.styles.statusBad)
          }}
        >
          Status: {overallStatus}
        </span>
      </div>
    );
  }
  
  renderProgressBar() {
    const completionPercentage = this.calculateCompletionPercentage();
    
    return (
      <div style={this.styles.progressContainer}>
        <div style={this.styles.progressHeader}>
          <span style={this.styles.progressLabel}>Task Completion</span>
          <span style={this.styles.progressLabel}>
            {completionPercentage}% ({this.data.completed}/{this.data.toatl_tasks})
          </span>
        </div>
        <div style={this.styles.progressBarContainer}>
          <div 
            style={{
              ...this.styles.progressBar,
              width: `${completionPercentage}%`
            }}
          ></div>
        </div>
      </div>
    );
  }
  
  renderStatusSection() {
    return (
      <div style={this.styles.statusGrid}>
        <div style={this.styles.statusBox}>
          <h3 style={this.styles.sectionTitle}>Current Status</h3>
          <div style={this.styles.metricsContainer}>
            <div style={this.styles.metricItem}>
              <span style={this.styles.metricLabel}>Running</span>
              <span style={this.styles.metricValue}>{this.data.currentstatus.running}</span>
            </div>
            <div style={this.styles.metricItem}>
              <span style={this.styles.metricLabel}>Error</span>
              <span style={this.styles.metricValue}>{this.data.currentstatus.completed_with_error}</span>
            </div>
            <div style={this.styles.metricItem}>
              <span style={this.styles.metricLabel}>Submitted</span>
              <span style={this.styles.metricValue}>{this.data.currentstatus.submitted}</span>
            </div>
          </div>
        </div>
        
        <div style={this.styles.statusBox}>
          <h3 style={this.styles.sectionTitle}>Data Center Distribution</h3>
          <div style={this.styles.metricsContainer}>
            <div style={this.styles.metricItem}>
              <span style={this.styles.metricLabel}>Cloud</span>
              <span style={this.styles.metricValue}>{this.data.data_center.cloud}</span>
            </div>
            <div style={this.styles.metricItem}>
              <span style={this.styles.metricLabel}>On-Premise</span>
              <span style={this.styles.metricValue}>{this.data.data_center.on_prame}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  renderTasksTable() {
    return (
      <div>
        <h3 style={this.styles.sectionTitle}>Running Tasks</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={this.styles.table}>
            <thead style={this.styles.tableHeader}>
              <tr>
                <th style={this.styles.tableHeaderCell}>Task Name</th>
                <th style={{...this.styles.tableHeaderCell, textAlign: 'center'}}>Running</th>
                <th style={{...this.styles.tableHeaderCell, textAlign: 'center'}}>Completed</th>
                <th style={{...this.styles.tableHeaderCell, textAlign: 'center'}}>With Error</th>
                <th style={{...this.styles.tableHeaderCell, textAlign: 'center'}}>In Queue</th>
                <th style={{...this.styles.tableHeaderCell, textAlign: 'center'}}>Progress</th>
              </tr>
            </thead>
            <tbody style={this.styles.tableBody}>
              {this.data.running.map((task, index) => {
                const total = task.child_task_running + task.child_task_completed + 
                              task.child_task_with_error + task.child_task_onqueue;
                return (
                  <tr key={index} style={this.styles.tableRow}>
                    <td style={{...this.styles.tableCell, fontWeight: '500'}}>{task.task_name}</td>
                    <td style={this.styles.tableCellCenter}>{task.child_task_running}</td>
                    <td style={this.styles.tableCellCenter}>{task.child_task_completed}</td>
                    <td style={this.styles.tableCellCenter}>{task.child_task_with_error}</td>
                    <td style={this.styles.tableCellCenter}>{task.child_task_onqueue}</td>
                    <td style={this.styles.tableCell}>
                      <div style={this.styles.progressBarRow}>
                        <div 
                          style={{
                            ...this.styles.progressSegmentCompleted,
                            width: `${(task.child_task_completed / total) * 100}%`
                          }}
                        ></div>
                        <div 
                          style={{
                            ...this.styles.progressSegmentRunning,
                            width: `${(task.child_task_running / total) * 100}%`
                          }}
                        ></div>
                        <div 
                          style={{
                            ...this.styles.progressSegmentError,
                            width: `${(task.child_task_with_error / total) * 100}%`
                          }}
                        ></div>
                        <div 
                          style={{
                            ...this.styles.progressSegmentQueue,
                            width: `${(task.child_task_onqueue / total) * 100}%`
                          }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.card}>
          <div style={this.styles.cardContent}>
            {this.renderHeader()}
            {this.renderProgressBar()}
            {this.renderStatusSection()}
            {this.renderTasksTable()}
          </div>
        </div>
      </div>
    );
  }
}

export default TaskDashboard;