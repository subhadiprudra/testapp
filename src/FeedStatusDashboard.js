import React, { PureComponent } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';

class FeedStatusDashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDetailsDialog: false
    };
    
    // Sample data - would be replaced with props in a real application
    this.feedsData = [
      {
       
        name: 'Customer Data',
        todayPositionCount: 1247,
        avgPositionCount: 1400,
        todayBookCount: 30,
        avgBookCount: 30,
        errors: 3,
        startTime: '06:45',
        avgStartTime: '06:30',
        completed: true,
        status: 'Completed'
      },
      {
        
        name: 'Product Data',
        todayPositionCount: 950,
        avgPositionCount: 900,
        todayBookCount: 25,
        avgBookCount: 28,
        errors: 0,
        startTime: '07:15',
        avgStartTime: '07:00',
        completed: true,
        status: 'Completed'
      },
      {
       
        name: 'Order History',
        todayPositionCount: 0,
        avgPositionCount: 800,
        todayBookCount: 0,
        avgBookCount: 20,
        errors: 0,
        startTime: '', // Not started yet
        avgStartTime: '07:30',
        completed: false,
        status: 'Running'
      },
      // Additional feeds would be added here
    ];
    
    // Current time for demo - in real application, use new Date()
    this.currentTime = '08:00';
    
    // Define styles once in the constructor for better performance
    this.styles = {
      container: {
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto'
      },
      summaryCard: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        marginBottom: '16px',
        cursor: 'pointer',
        border: '1px solid #e5e5e5',
        transition: 'border-color 0.2s ease'
      },
      cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      cardTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        margin: 0
      },
      statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginTop: '16px'
      },
      statItem: {
        backgroundColor: '#f9fafb',
        padding: '16px',
        borderRadius: '6px'
      },
      statHeader: {
        display: 'flex',
        alignItems: 'center'
      },
      statLabel: {
        fontWeight: '600',
        marginLeft: '8px'
      },
      statValue: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginTop: '4px'
      },
      dialogOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '16px'
      },
      dialogContainer: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      },
      dialogHeader: {
        padding: '16px 24px',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      dialogTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        margin: 0
      },
      closeButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '50%',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      dialogContent: {
        padding: '24px',
        overflowY: 'auto'
      },
      tableContainer: {
        overflowX: 'auto'
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse'
      },
      tableHeader: {
        textAlign: 'left',
        padding: '12px 16px',
        fontSize: '0.75rem',
        fontWeight: '500',
        textTransform: 'uppercase',
        color: '#6b7280',
        borderBottom: '1px solid #e5e5e5'
      },
      tableRow: {
        borderBottom: '1px solid #e5e5e5'
      },
      tableRowAlert: {
        backgroundColor: '#FEF2F2'
      },
      tableCell: {
        padding: '12px 16px'
      },
      statusBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '500'
      },
      completedBadge: {
        backgroundColor: '#d1fae5',
        color: '#065f46'
      },
      pendingBadge: {
        backgroundColor: '#fef3c7',
        color: '#92400e'
      },
      alertText: {
        color: '#dc2626',
        fontWeight: '500'
      },
      iconGreen: {
        color: '#10b981'
      },
      iconRed: {
        color: '#ef4444'
      },
      iconOrange: {
        color: '#f59e0b'
      },
      iconGray: {
        color: '#9ca3af'
      },
      redText: {
        color: '#dc2626'
      },
      greenText: {
        color: '#10b981'
      }
    };
    
    // Bind methods to this context
    this.toggleDetailsDialog = this.toggleDetailsDialog.bind(this);
    this.isDataSignificantlyLess = this.isDataSignificantlyLess.bind(this);
    this.isFeedDelayed = this.isFeedDelayed.bind(this);
    this.getPercentageDifference = this.getPercentageDifference.bind(this);
    this.renderFeedRow = this.renderFeedRow.bind(this);
  }
  
  // Toggle details dialog
  toggleDetailsDialog() {
    this.setState(prevState => ({
      showDetailsDialog: !prevState.showDetailsDialog
    }));
  }
  
  // Function to check if data is significantly less than average (10% threshold)
  isDataSignificantlyLess(feed) {
    const positionThreshold = feed.avgPositionCount * 0.9;
    const bookThreshold = feed.avgBookCount * 0.9;
    
    return (feed.completed && 
            (feed.todayPositionCount < positionThreshold || 
             feed.todayBookCount < bookThreshold));
  }
  
  // Function to check if feed is delayed
  isFeedDelayed(feed) {
    if (feed.completed) return false;
    
    // Convert times to comparable format (minutes since midnight)
    const convertToMinutes = (timeStr) => {
      if (!timeStr) return 0;
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    const currentMinutes = convertToMinutes(this.currentTime);
    const avgStartMinutes = convertToMinutes(feed.avgStartTime);
    
    return currentMinutes > avgStartMinutes;
  }
  
  // Calculate exact percentage difference for better reporting
  getPercentageDifference(current, average) {
    if (average === 0) return 0;
    const difference = ((current / average) * 100).toFixed(1);
    return difference;
  }
  
  // Render a feed row in the table
  renderFeedRow(feed) {
    return (
      <tr 
        key={feed.id} 
        style={{
          ...this.styles.tableRow,
          ...(this.isDataSignificantlyLess(feed) || this.isFeedDelayed(feed) ? this.styles.tableRowAlert : {})
        }}
      >
        <td style={this.styles.tableCell}>{feed.name}</td>
        <td style={this.styles.tableCell}>
          {feed.completed ? (
            <span style={{...this.styles.statusBadge, ...this.styles.completedBadge}}>
              Completed
            </span>
          ) : (
            <span style={{...this.styles.statusBadge, ...this.styles.pendingBadge}}>
              {feed.status}
            </span>
          )}
        </td>
        <td style={{
          ...this.styles.tableCell,
          ...(feed.completed && feed.todayPositionCount < feed.avgPositionCount * 0.9 ? this.styles.alertText : {})
        }}>
          {feed.todayPositionCount} / {feed.avgPositionCount}
          {feed.completed && feed.todayPositionCount < feed.avgPositionCount * 0.9 && (
            <span style={{
              marginLeft: '8px',
              fontSize: '0.75rem',
              color: '#dc2626'
            }}>
              ({this.getPercentageDifference(feed.todayPositionCount, feed.avgPositionCount)}% of avg, below 90% threshold)
            </span>
          )}
        </td>
        <td style={{
          ...this.styles.tableCell,
          ...(feed.completed && feed.todayBookCount < feed.avgBookCount * 0.9 ? this.styles.alertText : {})
        }}>
          {feed.todayBookCount} / {feed.avgBookCount}
          {feed.completed && feed.todayBookCount < feed.avgBookCount * 0.9 && (
            <span style={{
              marginLeft: '8px',
              fontSize: '0.75rem',
              color: '#dc2626'
            }}>
              ({this.getPercentageDifference(feed.todayBookCount, feed.avgBookCount)}% of avg, below 90% threshold)
            </span>
          )}
        </td>
        <td style={this.styles.tableCell}>
          {feed.errors > 0 ? (
            <span style={this.styles.alertText}>{feed.errors}</span>
          ) : (
            <span>0</span>
          )}
        </td>
        <td style={{
          ...this.styles.tableCell,
          ...(this.isFeedDelayed(feed) ? this.styles.alertText : {})
        }}>
          {feed.startTime || 'Not Started'} 
          {this.isFeedDelayed(feed) && (
            <span style={{
              marginLeft: '8px',
              fontSize: '0.75rem',
              color: '#dc2626'
            }}>
              (Expected: {feed.avgStartTime})
            </span>
          )}
        </td>
      </tr>
    );
  }
  
  render() {
    const { showDetailsDialog } = this.state;
    
    // Memoized calculations
    const totalFeeds = this.feedsData.length;
    const completedFeeds = this.feedsData.filter(feed => feed.completed).length;
    const dataAlerts = this.feedsData.filter(feed => this.isDataSignificantlyLess(feed)).length;
    const delayAlerts = this.feedsData.filter(feed => this.isFeedDelayed(feed)).length;
    const totalAlerts = dataAlerts + delayAlerts;
    
    return (
      <div style={this.styles.container}>
        {/* Summary Card */}
        <div 
          style={{
            ...this.styles.summaryCard,
            borderColor: showDetailsDialog ? '#60a5fa' : '#e5e5e5'
          }}
          onClick={this.toggleDetailsDialog}
        >
          <div style={this.styles.cardHeader}>
            <h2 style={this.styles.cardTitle}>Feed Status Dashboard</h2>
          </div>
          
          <div style={this.styles.statsGrid}>
            {/* Completed Feeds */}
            <div style={this.styles.statItem}>
              <div style={this.styles.statHeader}>
                <CheckCircle style={this.styles.iconGreen} size={20} />
                <span style={this.styles.statLabel}>Completed</span>
              </div>
              <div style={this.styles.statValue}>{completedFeeds}/{totalFeeds}</div>
            </div>
            
            {/* Data Alerts */}
            <div style={this.styles.statItem}>
              <div style={this.styles.statHeader}>
                <AlertCircle style={dataAlerts > 0 ? this.styles.iconRed : this.styles.iconGray} size={20} />
                <span style={this.styles.statLabel}>Data Alerts (10% Threshold)</span>
              </div>
              <div style={{
                ...this.styles.statValue,
                ...(dataAlerts > 0 ? this.styles.redText : {})
              }}>{dataAlerts}</div>
            </div>
            
            {/* Delay Alerts */}
            <div style={this.styles.statItem}>
              <div style={this.styles.statHeader}>
                <Clock style={delayAlerts > 0 ? this.styles.iconOrange : this.styles.iconGray} size={20} />
                <span style={this.styles.statLabel}>Delay Alerts</span>
              </div>
              <div style={{
                ...this.styles.statValue,
                ...(delayAlerts > 0 ? this.styles.redText : {})
              }}>{delayAlerts}</div>
            </div>
            
            {/* Overall Status */}
            <div style={this.styles.statItem}>
              <div style={this.styles.statHeader}>
                {totalAlerts > 0 ? (
                  <AlertTriangle style={this.styles.iconRed} size={20} />
                ) : (
                  <CheckCircle style={this.styles.iconGreen} size={20} />
                )}
                <span style={this.styles.statLabel}>Overall Status</span>
              </div>
              <div style={{
                ...this.styles.statValue,
                ...(totalAlerts > 0 ? this.styles.redText : this.styles.greenText)
              }}>
                {totalAlerts > 0 ? 'Attention Needed' : 'Good'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Details Dialog */}
        {showDetailsDialog && (
          <div style={this.styles.dialogOverlay}>
            <div style={this.styles.dialogContainer}>
              {/* Dialog Header */}
              <div style={this.styles.dialogHeader}>
                <h3 style={this.styles.dialogTitle}>Feed Details</h3>
                <button 
                  onClick={this.toggleDetailsDialog}
                  style={this.styles.closeButton}
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Dialog Content */}
              <div style={this.styles.dialogContent}>
                <div style={this.styles.tableContainer}>
                  <table style={this.styles.table}>
                    <thead>
                      <tr>
                        <th style={this.styles.tableHeader}>Feed Name</th>
                        <th style={this.styles.tableHeader}>Status</th>
                        <th style={this.styles.tableHeader}>Positions</th>
                        <th style={this.styles.tableHeader}>Books</th>
                        <th style={this.styles.tableHeader}>Errors</th>
                        <th style={this.styles.tableHeader}>Start Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.feedsData.map(this.renderFeedRow)}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* No footer needed since we removed the close button */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FeedStatusDashboard;