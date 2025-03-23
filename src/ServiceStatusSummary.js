import React, { PureComponent } from 'react';

class ServiceStatusSummary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false
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
        }
      }
    };

    // Bind methods
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.isServiceGood = this.isServiceGood.bind(this);
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

    // Inline styles for the component - simplified and reusable
    const styles = {
      // Common styles
      container: {
        display: 'flex',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'left',
        minHeight: '10vh',
        minWidth:'10vw',
        fontFamily: 'Arial, sans-serif'
      },
      card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        width: '100%',
        maxWidth: '400px',
        cursor: 'pointer'
      },
      title: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '16px'
      },
      flexBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      },
      
      // Text colors
      goodText: {
        color: '#22c55e',
        fontWeight: 'bold'
      },
      badText: {
        color: '#ef4444',
        fontWeight: 'bold'
      },
      mutedText: {
        color: '#6b7280',
        fontSize: '14px'
      },
      
      // Progress bar
      progressBar: {
        width: '100%',
        height: '16px',
        backgroundColor: '#e5e5e5',
        borderRadius: '9999px',
        overflow: 'hidden',
        marginTop: '8px'
      },
      progressFlex: {
        display: 'flex',
        height: '100%'
      },
      goodProgress: {
        backgroundColor: '#22c55e',
        height: '100%'
      },
      badProgress: {
        backgroundColor: '#ef4444',
        height: '100%'
      },
      
      // Dialog
      dialog: {
        position: 'fixed',
        inset: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px'
      },
      dialogContent: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      },
      closeButton: {
        color: '#6b7280',
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        fontSize: '20px'
      },
      
      // Table styles
      table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '16px',
        fontSize: '14px'
      },
      tableHeader: {
        textAlign: 'left',
        padding: '10px',
        borderBottom: '2px solid #e5e5e5',
        fontWeight: 'bold'
      },
      tableCell: {
        padding: '10px',
        borderBottom: '1px solid #e5e5e5'
      },
      goodTableRow: {
        backgroundColor: '#f0fdf4'
      },
      badTableRow: {
        backgroundColor: '#fef2f2'
      }
    };

    return (
      <div style={styles.container}>
        <div style={styles.card} onClick={this.openDialog}>
          <h2 style={styles.title}>Service Status Summary</h2>
          
          <div style={styles.flexBetween}>
            <span>Overall Status:</span>
            <span style={overallStatus === 'Good' ? styles.goodText : styles.badText}>
              {overallStatus}
            </span>
          </div>
          
          <div style={styles.flexBetween}>
            <span style={styles.goodText}>Good: {goodCount}</span>
            <span style={styles.badText}>Bad: {badCount}</span>
          </div>
          
          {/* Progress Bar */}
          <div style={styles.progressBar}>
            <div style={styles.progressFlex}>
              <div style={{...styles.goodProgress, width: `${goodPercentage}%`}}></div>
              <div style={{...styles.badProgress, width: `${badPercentage}%`}}></div>
            </div>
          </div>
          
          <div style={{...styles.mutedText, textAlign: 'center', marginTop: '8px'}}>
            Click for details
          </div>
        </div>
          
        {/* Dialog */}
        {this.state.isDialogOpen && (
          <div style={styles.dialog}>
            <div style={styles.dialogContent}>
              <div style={styles.flexBetween}>
                <h2 style={styles.title}>Services Health Details</h2>
                <button 
                  onClick={this.closeDialog}
                  style={styles.closeButton}
                >
                  ✕
                </button>
              </div>
              
              {/* Services Table */}
              <div>
                <h3 style={{...styles.title, fontSize: '18px'}}>Services Details</h3>
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
                        <td style={styles.tableCell}>{service.name}</td>
                        <td style={{...styles.tableCell, ...styles.goodText}}>Good</td>
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
                        <td style={styles.tableCell}>{service.name}</td>
                        <td style={{...styles.tableCell, ...styles.badText}}>Bad</td>
                        <td style={styles.tableCell}>{service.info.idle}</td>
                        <td style={styles.tableCell}>{service.info.min}</td>
                        <td style={styles.tableCell}>{service.info.max}</td>
                        <td style={styles.tableCell}>{service.info.failed}</td>
                        <td style={styles.tableCell}>{service.info.unknown}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ServiceStatusSummary;