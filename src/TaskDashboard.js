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
  
  render() {
    const completionPercentage = this.calculateCompletionPercentage();
    const overallStatus = this.determineOverallStatus();
    
    // Inline styles
    const styles = {
      dashboard: {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        padding: '12px',
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      },
      outerCard: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '20px',
        margin: '10px 0'
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        marginBottom: '10px',
        borderBottom: '1px solid #e5e7eb'
      },
      headerTitle: {
        margin: 0,
        fontSize: '16px',
        fontWeight: 'bold'
      },
      statusBadge: {
        padding: '4px 12px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '13px',
        backgroundColor: overallStatus === 'Good' ? '#d1fae5' : '#fee2e2',
        color: overallStatus === 'Good' ? '#065f46' : '#b91c1c'
      },
      statsContainer: {
        display: 'flex',
        gap: '12px',
        marginBottom: '12px'
      },
      statsBox: {
        backgroundColor: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        flex: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      },
      statsBoxTitle: {
        fontSize: '13px',
        fontWeight: 'normal',
        color: '#6b7280',
        marginTop: 0,
        marginBottom: '8px'
      },
      progressBarContainer: {
        width: '100%',
        height: '8px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
        marginTop: '8px'
      },
      progressBar: {
        height: '100%',
        backgroundColor: '#3b82f6',
        borderRadius: '4px'
      },
      statValue: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: 0
      },
      statPercent: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#3b82f6'
      },
      statLabel: {
        fontSize: '13px',
        color: '#6b7280',
        marginTop: '4px'
      },
      tableContainer: {
        backgroundColor: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        padding: '16px',
        flexGrow: 1,
        overflow: 'auto',
        marginTop: '15px'
      },
      tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      },
      tableTitle: {
        fontSize: '15px',
        fontWeight: 'bold',
        margin: 0
      },
      tableSubtitle: {
        fontSize: '13px',
        color: '#6b7280'
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse'
      },
      th: {
        textAlign: 'left',
        padding: '10px 16px',
        fontSize: '13px',
        fontWeight: 'normal',
        color: '#6b7280',
        borderBottom: '1px solid #e5e7eb'
      },
      td: {
        padding: '12px 16px',
        fontSize: '14px',
        borderBottom: '1px solid #e5e7eb'
      },
      taskProgressBar: {
        height: '6px',
        backgroundColor: '#e5e7eb',
        borderRadius: '3px',
        overflow: 'hidden',
        display: 'flex'
      },
      progressSegment: {
        height: '100%'
      },
      statusIndicator: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        marginRight: '8px'
      },
      circularProgressContainer: {
        position: 'relative',
        width: '150px',
        height: '150px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      circularProgressText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%'
      },
      circularProgressPercent: {
        fontSize: '26px',
        fontWeight: 'bold',
        color: '#10b981',
        marginBottom: '5px'
      },
      circularProgressFraction: {
        fontSize: '16px',
        fontWeight: '500',
        color: '#6b7280'
      }
    };

    return (
      <div style={styles.dashboard}>
        <div style={styles.outerCard}>
          {/* Header with Status */}
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>Task Management Dashboard</h1>
            <div style={styles.statusBadge}>
              Status: {overallStatus}
            </div>
          </div>
          
          {/* Main stats row - all cards in one row */}
          <div style={{display: 'flex', gap: '12px', marginBottom: '12px', marginTop: '15px'}}>
            {/* Task Completion Card - 40% width */}
            <div style={{
              ...styles.statsBox,
              padding: '16px 20px',
              width: '40%',
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box'
            }}>
              <div style={{width: '100%'}}>
                <h3 style={{...styles.statsBoxTitle, fontSize: '13px', margin: '0 0 12px 0'}}>TASK COMPLETION</h3>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}>
                  <div>
                    <div style={{fontSize: '32px', fontWeight: 'bold', color: '#111827', lineHeight: 1, marginBottom: '5px'}}>
                      {this.data.completed}
                    </div>
                    <div style={{fontSize: '14px', color: '#6b7280', marginBottom: '5px'}}>
                      of {this.data.toatl_tasks} tasks
                    </div>
                    <div style={{fontSize: '13px', color: '#6b7280'}}>
                      {this.data.toatl_tasks - this.data.completed} tasks remaining
                    </div>
                  </div>
                  
                  <div style={{
                    width: '90px',
                    height: '90px',
                    position: 'relative',
                    flexShrink: 0
                  }}>
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${completionPercentage * 2.64} 264`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        color: '#10b981',
                        lineHeight: '1'
                      }}>{completionPercentage}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Status - 30% width */}
            <div style={{
              ...styles.statsBox,
              padding: '16px 20px',
              width: '30%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{...styles.statsBoxTitle, fontSize: '13px', margin: '0 0 12px 0'}}>CURRENT STATUS</h3>
              
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '5px'}}>{this.data.currentstatus.running}</div>
                  <div style={{fontSize: '13px', color: '#6b7280'}}>Running</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#ef4444', marginBottom: '5px'}}>{this.data.currentstatus.completed_with_error}</div>
                  <div style={{fontSize: '13px', color: '#6b7280'}}>Error</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '5px'}}>{this.data.currentstatus.submitted}</div>
                  <div style={{fontSize: '13px', color: '#6b7280'}}>Submitted</div>
                </div>
              </div>
            </div>
            
            {/* Data Center - 30% width */}
            <div style={{
              ...styles.statsBox,
              padding: '16px 20px',
              width: '30%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{...styles.statsBoxTitle, fontSize: '13px', margin: '0 0 12px 0'}}>DATA CENTER</h3>
              
              <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '5px'}}>{this.data.data_center.cloud}</div>
                  <div style={{fontSize: '13px', color: '#6b7280'}}>Cloud</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '5px'}}>{this.data.data_center.on_prame}</div>
                  <div style={{fontSize: '13px', color: '#6b7280'}}>On-Premise</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Running Tasks Table */}
          <div style={styles.tableContainer}>
            <div style={styles.tableHeader}>
              <h2 style={styles.tableTitle}>Running Tasks</h2>
              <span style={styles.tableSubtitle}>{this.data.running.length} active tasks</span>
            </div>
            
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Task Name</th>
                  <th style={styles.th}>Running</th>
                  <th style={styles.th}>Completed</th>
                  <th style={styles.th}>Error</th>
                  <th style={styles.th}>Queue</th>
                  <th style={{...styles.th, width: '30%'}}>Progress</th>
                </tr>
              </thead>
              <tbody>
                {this.data.running.map((task, index) => {
                  const total = task.child_task_running + task.child_task_completed + 
                               task.child_task_with_error + task.child_task_onqueue;
                  const completedPct = Math.round((task.child_task_completed / total) * 100);
                  
                  return (
                    <tr key={index}>
                      <td style={styles.td}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <div 
                            style={{
                              ...styles.statusIndicator, 
                              backgroundColor: task.child_task_with_error > 0 ? '#ef4444' : '#3b82f6'
                            }}
                          ></div>
                          {task.task_name}
                        </div>
                      </td>
                      <td style={styles.td}>{task.child_task_running}</td>
                      <td style={styles.td}>{task.child_task_completed}</td>
                      <td style={{...styles.td, color: task.child_task_with_error > 0 ? '#ef4444' : 'inherit'}}>
                        {task.child_task_with_error}
                      </td>
                      <td style={styles.td}>{task.child_task_onqueue}</td>
                      <td style={styles.td}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                          <div style={{flex: 1}}>
                            <div style={styles.taskProgressBar}>
                              <div 
                                style={{
                                  ...styles.progressSegment, 
                                  backgroundColor: '#22c55e',
                                  width: `${(task.child_task_completed / total) * 100}%`
                                }}
                              ></div>
                              <div 
                                style={{
                                  ...styles.progressSegment, 
                                  backgroundColor: '#3b82f6',
                                  width: `${(task.child_task_running / total) * 100}%`
                                }}
                              ></div>
                              <div 
                                style={{
                                  ...styles.progressSegment, 
                                  backgroundColor: '#ef4444',
                                  width: `${(task.child_task_with_error / total) * 100}%`
                                }}
                              ></div>
                              <div 
                                style={{
                                  ...styles.progressSegment, 
                                  backgroundColor: '#f59e0b',
                                  width: `${(task.child_task_onqueue / total) * 100}%`
                                }}
                              ></div>
                            </div>
                          </div>
                          <div style={{width: '36px', fontSize: '13px', fontWeight: 'bold'}}>{completedPct}%</div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskDashboard;