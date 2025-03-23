import React, { PureComponent } from 'react';

class ServiceStatusSummary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      lastRefreshed: new Date()
    };

    // Sample input data
    this.data = {
      "services": {
        "service1": {
          "serviceInfo": {
            "starting": 0,
            "idle": 10,
            "min": 9,
            "max": 12,
            "failed": 0,
            "unknown": 0
          }
        },
        "service2": {
          "serviceInfo": {
            "starting": 0,
            "idle": 7,
            "min": 9,
            "max": 12,
            "failed": 2,
            "unknown": 1
          }
        },
        "service3": {
          "serviceInfo": {
            "starting": 0,
            "idle": 2,
            "min": 2,
            "max": 3,
            "failed": 0,
            "unknown": 0
          }
        }
      }
    };

    // Bind methods
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.isServiceGood = this.isServiceGood.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  // Function to check if a service is in good state
  isServiceGood(serviceInfo) {
    return (
      serviceInfo.idle >= serviceInfo.min &&
      serviceInfo.idle <= serviceInfo.max &&
      serviceInfo.failed === 0 &&
      serviceInfo.unknown === 0
    );
  }

  openDialog() {
    this.setState({ isDialogOpen: true });
  }

  closeDialog() {
    this.setState({ isDialogOpen: false });
  }

  refreshData(e) {
    if (e) {
      e.stopPropagation();
    }
    
    // In a real application, we would fetch new data here
    // For now, we'll just update the timestamp
    this.setState({ lastRefreshed: new Date() });
    
    // Simulating data change for demo purposes
    const randomizeIdle = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    const updatedData = {
      "services": {
        "service1": {
          "serviceInfo": {
            ...this.data.services.service1.serviceInfo,
            "idle": randomizeIdle(8, 13)
          }
        },
        "service2": {
          "serviceInfo": {
            ...this.data.services.service2.serviceInfo,
            "idle": randomizeIdle(6, 13),
            "failed": Math.random() > 0.5 ? 0 : 2
          }
        },
        "service3": {
          "serviceInfo": {
            ...this.data.services.service3.serviceInfo,
            "idle": randomizeIdle(1, 4)
          }
        }
      }
    };
    
    this.data = updatedData;
  }

  render() {
    // Process services data
    const processedServices = Object.entries(this.data.services).map(([name, info]) => {
      return {
        name,
        isGood: this.isServiceGood(info.serviceInfo),
        info: info.serviceInfo
      };
    });

    const goodServices = processedServices.filter(service => service.isGood);
    const badServices = processedServices.filter(service => !service.isGood);
    
    const totalServices = processedServices.length;
    const goodCount = goodServices.length;
    const badCount = badServices.length;
    const overallStatus = badCount === 0 ? "Good" : "Bad";
    const goodPercentage = (goodCount / totalServices) * 100;
    const badPercentage = (badCount / totalServices) * 100;
    
    // Calculate the circle progress coordinates
    const calculateCircle = (percentage) => {
      // Circle parameters
      const radius = 50;
      const circumference = 2 * Math.PI * radius;
      const strokeDasharray = circumference;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;
      
      return {
        strokeDasharray: `${strokeDasharray}`,
        strokeDashoffset: `${strokeDashoffset}`
      };
    };
    
    const goodCircleParams = calculateCircle(goodPercentage);
    const badCircleParams = calculateCircle(badPercentage);

    // Inline styles for the component - enhanced for better visual appeal
    const styles = {
      // Common styles
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:'200px',
        width:'35%',
        backgroundColor: '#f8fafc',
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        color: '#334155'
      },
      card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        padding: '20px',
        width: '100%',
        height:'100%',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      },
      circularProgress: {
        position: 'relative',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '25px'
      },
      circleBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: '10px solid #e2e8f0',
        borderRadius: '50%',
        boxSizing: 'border-box'
      },
      circleProgress: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        boxSizing: 'border-box'
      },
      circleText: {
        fontSize: '16px',
        fontWeight: '600',
        textAlign: 'center'
      },
      title: {
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '12px',
        color: '#1e293b',
        textAlign: 'center'
      },
      subtitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '10px',
        color: '#1e293b'
      },
      flexBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      },
      statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontWeight: '600',
        fontSize: '14px',
        display: 'inline-block'
      },
      
      // Text colors and badges
      goodText: {
        color: '#16a34a',
        fontWeight: '600'
      },
      badText: {
        color: '#dc2626',
        fontWeight: '600'
      },
      goodBadge: {
        backgroundColor: '#dcfce7',
        color: '#16a34a'
      },
      badBadge: {
        backgroundColor: '#fee2e2',
        color: '#dc2626'
      },
      mutedText: {
        color: '#64748b',
        fontSize: '14px'
      },
      statsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '15px',
        marginTop: '10px'
      },
      statItem: {
        textAlign: 'center',
        padding: '8px 12px',
        borderRadius: '8px',
        width: '42%'
      },
      statNumber: {
        fontSize: '22px',
        fontWeight: '700',
        marginBottom: '2px'
      },
      statLabel: {
        fontSize: '14px',
        color: '#64748b'
      },
      
      // Progress bar
      progressBar: {
        width: '100%',
        height: '10px',
        backgroundColor: '#e2e8f0',
        borderRadius: '5px',
        overflow: 'hidden',
        marginTop: '8px',
        marginBottom: '10px'
      },
      progressFlex: {
        display: 'flex',
        height: '100%'
      },
      goodProgress: {
        backgroundColor: '#22c55e',
        height: '100%',
        transition: 'width 0.5s ease-out'
      },
      badProgress: {
        backgroundColor: '#ef4444',
        height: '100%',
        transition: 'width 0.5s ease-out'
      },
      
      // Refresh button and timestamp
      refreshButton: {
        backgroundColor: '#f1f5f9',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '500',
        color: '#64748b',
        fontSize: '14px',
        transition: 'background-color 0.2s ease'
      },
      refreshIcon: {
        marginRight: '6px',
        fontSize: '16px'
      },
      lastUpdated: {
        fontSize: '12px',
        color: '#94a3b8',
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center'
      },
      
      // Dialog
      dialog: {
        position: 'fixed',
        inset: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        zIndex: 1000,
        backdropFilter: 'blur(2px)'
      },
      dialogContent: {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        padding: '24px',
        maxWidth: '1000px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto'
      },
      closeButton: {
        color: '#94a3b8',
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        transition: 'background-color 0.2s ease'
      },
      
      // Table styles
      tableContainer: {
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px',
        overflow: 'hidden'
      },
      tableHeader: {
        textAlign: 'left',
        padding: '14px 16px',
        backgroundColor: '#f8fafc',
        color: '#64748b',
        fontWeight: '600',
        borderBottom: '2px solid #e2e8f0',
        whiteSpace: 'nowrap'
      },
      tableCell: {
        padding: '12px 16px',
        borderBottom: '1px solid #e2e8f0'
      },
      goodTableRow: {
        backgroundColor: '#f0fdf4'
      },
      badTableRow: {
        backgroundColor: '#fef2f2'
      },
      clickForDetails: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '16px',
        color: '#64748b',
        fontSize: '14px'
      },
      statusIcon: {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginRight: '6px'
      },
      goodStatusIcon: {
        backgroundColor: '#22c55e'
      },
      badStatusIcon: {
        backgroundColor: '#ef4444'
      }
    };

    return (
      <div style={styles.container}>
        <div style={styles.card} onClick={this.openDialog}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
            <h2 style={{...styles.title, marginBottom: '0', textAlign: 'left'}}>Service Status Summary</h2>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={styles.lastUpdated}>
                Updated: {this.state.lastRefreshed.toLocaleTimeString()}
              </div>
              <button 
                style={styles.refreshButton}
                onClick={this.refreshData}
              >
                <span style={styles.refreshIcon}>↻</span> Refresh
              </button>
            </div>
          </div>
          
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {/* Circular Progress */}
            <div style={styles.circularProgress}>
              <div style={styles.circleBackground}></div>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  strokeWidth="10" 
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke="#22c55e" 
                  strokeWidth="10" 
                  strokeLinecap="round"
                  strokeDasharray={goodCircleParams.strokeDasharray}
                  strokeDashoffset={goodCircleParams.strokeDashoffset}
                  transform="rotate(-90 60 60)"
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="10" 
                  strokeLinecap="round"
                  strokeDasharray={badCircleParams.strokeDasharray}
                  strokeDashoffset={badCircleParams.strokeDashoffset}
                  transform={`rotate(${goodPercentage * 3.6 - 90} 60 60)`}
                />
              </svg>
              <div style={{...styles.circleText, position: 'absolute'}}>
                <div>{goodCount + badCount}</div>
                <div>Services</div>
              </div>
            </div>
            
            <div style={{flex: '1'}}>
              <div style={styles.flexBetween}>
                <span>Overall Status:</span>
                <span 
                  style={{
                    ...styles.statusBadge,
                    ...(overallStatus === 'Good' ? styles.goodBadge : styles.badBadge)
                  }}
                >
                  {overallStatus}
                </span>
              </div>
              
              <div style={styles.statsContainer}>
                <div style={{
                  ...styles.statItem,
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #dcfce7'
                }}>
                  <div style={{...styles.statNumber, color: '#16a34a'}}>{goodCount}</div>
                  <div style={styles.statLabel}>Good Services</div>
                </div>
                
                <div style={{
                  ...styles.statItem,
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fee2e2'
                }}>
                  <div style={{...styles.statNumber, color: '#dc2626'}}>{badCount}</div>
                  <div style={styles.statLabel}>Problem Services</div>
                </div>
              </div>
              
              <div style={{textAlign: 'center', color: '#64748b', fontSize: '14px', marginTop: '5px'}}>
                ↗ Click for details
              </div>
            </div>
          </div>
        </div>
          
        {/* Dialog */}
        {this.state.isDialogOpen && (
          <div style={styles.dialog}>
            <div style={styles.dialogContent}>
              <div style={styles.flexBetween}>
                <h2 style={styles.title}>Services Health Details</h2>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={styles.lastUpdated}>
                    Updated: {this.state.lastRefreshed.toLocaleTimeString()}
                  </div>
                  <button 
                    style={styles.refreshButton}
                    onClick={this.refreshData}
                  >
                    <span style={styles.refreshIcon}>↻</span> Refresh
                  </button>
                  <button 
                    onClick={this.closeDialog}
                    style={{...styles.closeButton, marginLeft: '8px'}}
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              {/* Services Table */}
              <div>
                <h3 style={{...styles.title, fontSize: '18px', marginBottom: '12px'}}>Services Details</h3>
                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.tableHeader}>Service Name</th>
                        <th style={styles.tableHeader}>Status</th>
                        <th style={styles.tableHeader}>Idle</th>
                        <th style={styles.tableHeader}>Min</th>
                        <th style={styles.tableHeader}>Max</th>
                        <th style={styles.tableHeader}>Failed</th>
                        <th style={styles.tableHeader}>Unknown</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Good Services */}
                      {goodServices.map(service => (
                        <tr key={service.name} style={styles.goodTableRow}>
                          <td style={{...styles.tableCell, fontWeight: '500'}}>{service.name}</td>
                          <td style={styles.tableCell}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <span style={{...styles.statusIcon, ...styles.goodStatusIcon}}></span>
                              <span style={styles.goodText}>Good</span>
                            </div>
                          </td>
                          <td style={styles.tableCell}>{service.info.idle}</td>
                          <td style={styles.tableCell}>{service.info.min}</td>
                          <td style={styles.tableCell}>{service.info.max}</td>
                          <td style={styles.tableCell}>{service.info.failed}</td>
                          <td style={styles.tableCell}>{service.info.unknown}</td>
                        </tr>
                      ))}
                      
                      {/* Bad Services */}
                      {badServices.map(service => (
                        <tr key={service.name} style={styles.badTableRow}>
                          <td style={{...styles.tableCell, fontWeight: '500'}}>{service.name}</td>
                          <td style={styles.tableCell}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <span style={{...styles.statusIcon, ...styles.badStatusIcon}}></span>
                              <span style={styles.badText}>Bad</span>
                            </div>
                          </td>
                          <td style={styles.tableCell}>
                            <span style={service.info.idle < service.info.min || service.info.idle > service.info.max ? styles.badText : null}>
                              {service.info.idle}
                            </span>
                          </td>
                          <td style={styles.tableCell}>{service.info.min}</td>
                          <td style={styles.tableCell}>{service.info.max}</td>
                          <td style={styles.tableCell}>
                            <span style={service.info.failed > 0 ? styles.badText : null}>
                              {service.info.failed}
                            </span>
                          </td>
                          <td style={styles.tableCell}>
                            <span style={service.info.unknown > 0 ? styles.badText : null}>
                              {service.info.unknown}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ServiceStatusSummary;