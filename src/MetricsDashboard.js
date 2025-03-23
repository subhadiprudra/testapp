import React, { useState, useEffect } from 'react';
// Removing external CSS import since it's causing an error
// We'll use inline styles instead
import x from './x.json'

const styles = {
  dashboardContainer: {
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
    marginTop:'50px',
    marginBottom:'100px'
  },
  dashboardTitle: {
    fontSize: '32px',
    fontWeight: 700,
    margin: '0 0 24px 0',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: '-0.5px'
  },
  tabsContainer: {
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: 'none'
  },
  tab: {
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: 600,
    background: 'none',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#6b7280',
    outline: 'none',
    margin: '0 4px',
    transition: 'all 0.2s ease'
  },
  activeTab: {
    color: '#ffffff',
    backgroundColor: '#4f46e5',
    boxShadow: '0 2px 5px rgba(79, 70, 229, 0.3)'
  },
  systemsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '24px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  },
  systemCard: {
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    overflow: 'hidden'
  },
  systemHeader: {
    padding: '18px 20px',
    borderBottom: '1px solid #f3f4f6',
    backgroundColor: '#ffffff'
  },
  systemTitle: {
    fontSize: '20px',
    fontWeight: 700,
    margin: 0,
    textTransform: 'capitalize',
    color: '#111827'
  },
  systemContent: {
    padding: '24px 20px',
    backgroundColor: '#ffffff'
  },
  metricsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  metricSection: {
    textAlign: 'center',
    width: '100%'
  },
  metricTitleGood: {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '8px',
    color: '#059669'
  },
  metricTitleBad: {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '8px',
    color: '#dc2626'
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  circularProgress: {
    position: 'relative',
    width: '100px',
    height: '100px',
    margin: '0 auto'
  },
  progressBg: {
    fill: 'none',
    stroke: '#f3f4f6',
    strokeWidth: 5
  },
  progressValueGood: {
    fill: 'none',
    strokeWidth: 5,
    strokeLinecap: 'round',
    stroke: '#10b981'
  },
  progressValueBad: {
    fill: 'none',
    strokeWidth: 5,
    strokeLinecap: 'round',
    stroke: '#f43f5e'
  },
  progressLabelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%'
  },
  progressLabelGood: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#059669'
  },
  progressLabelBad: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#dc2626'
  },
  metricsFooter: {
    textAlign: 'center',
    marginTop: '20px',
    backgroundColor: '#f9fafb',
    padding: '12px',
    borderRadius: '8px'
  },
  totalMetrics: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#4b5563',
    margin: 0
  },
  clickHint: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '4px 0 0 0'
  },
  dialogOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(3px)'
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxWidth: '900px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  dialogHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #f3f4f6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb'
  },
  dialogTitle: {
    fontSize: '22px',
    fontWeight: 700,
    margin: 0,
    color: '#111827'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6b7280',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s'
  },
  dialogContent: {
    padding: '24px',
    overflowX: 'auto'
  },
  dialogFooter: {
    padding: '16px 24px',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#f9fafb'
  },
  closeDialogButton: {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  },
  metricsTable: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  tableHeader: {
    padding: '14px 16px',
    textAlign: 'left',
    backgroundColor: '#f9fafb',
    fontWeight: 600,
    color: '#374151',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '0.5px'
  },
  tableCell: {
    padding: '14px 16px',
    textAlign: 'left',
    borderBottom: '1px solid #f3f4f6'
  },
  goodRow: {
    backgroundColor: '#f0fdf4'
  },
  badRow: {
    backgroundColor: '#fef2f2'
  },
  metricName: {
    fontWeight: 600,
    color: '#111827'
  },
  statusBadgeGood: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: '#d1fae5',
    color: '#047857'
  },
  statusBadgeBad: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: '#fee2e2',
    color: '#b91c1c'
  },
  loading: {
    padding: '32px',
    textAlign: 'center',
    color: '#4b5563'
  }
};

const MetricsDashboard = () => {
  const [data, setData] = useState(null);
  const [activePhase, setActivePhase] = useState('phase1');
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
       // const response = await window.fs.readFile('paste.txt', { encoding: 'utf8' });
      //  const jsonData = JSON.parse(x);
        setData(x);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };
    fetchData();
  }, []);
  
  const isMetricBad = (metric) => {
    return (
      metric.erorr > 0 || 
      (metric.lastday_count > 0 && metric.count < 0.9 * metric.lastday_count) ||
      metric.lastday_error > 0
    );
  };
  
  const getSystemSummary = (phase, system) => {
    if (!data) return { total: 0, bad: 0, metrics: {} };
    
    const systemData = data[phase][system];
    const metrics = Object.keys(systemData);
    
    const badMetrics = metrics.filter(metricName => isMetricBad(systemData[metricName]));
    
    return {
      total: metrics.length,
      bad: badMetrics.length,
      good: metrics.length - badMetrics.length,
      metrics: systemData
    };
  };
  
  const handleSystemClick = (system) => {
    setSelectedSystem(system);
    setDialogOpen(true);
  };
  
  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedSystem(null);
  };
  
  const renderMetricDetailsTable = () => {
    if (!selectedSystem || !data || !data[activePhase] || !data[activePhase][selectedSystem]) {
      return null;
    }
    
    const metrics = data[activePhase][selectedSystem];
    const metricNames = Object.keys(metrics);
    
    return (
      <table className="metrics-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Current Count</th>
            <th>Previous Count</th>
            <th>Current Errors</th>
            <th>Previous Errors</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {metricNames.map(metricName => {
            const metric = metrics[metricName];
            const isBad = isMetricBad(metric);
            const hasCountDropped = metric.lastday_count > 0 && metric.count < 0.9 * metric.lastday_count;
            
            return (
              <tr key={metricName} className={isBad ? 'bad-row' : 'good-row'}>
                <td className="metric-name">{metricName}</td>
                <td>{metric.count}</td>
                <td>{metric.lastday_count}</td>
                <td>{metric.erorr}</td>
                <td>{metric.lastday_error}</td>
                <td>
                  {isBad ? (
                    <span className="status-badge bad">
                      Bad
                      {metric.erorr > 0 && " (Has errors)"}
                      {metric.lastday_error > 0 && " (Had errors)"}
                      {hasCountDropped && " (Count dropped)"}
                    </span>
                  ) : (
                    <span className="status-badge good">
                      Good
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  
  if (!data) {
    return <div style={styles.loading}>Loading data...</div>;
  }
  
  const phases = Object.keys(data);
  const systems = data[activePhase] ? Object.keys(data[activePhase]) : [];
  
  return (
    <div style={{...styles.dashboardContainer, background: 'white'}}>
      <h2 style={{...styles.dashboardTitle, textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'}}>Metrics Performance Dashboard</h2>
      <div style={styles.tabsContainer}>
        <div style={styles.tabs}>
          {phases.map(phase => (
            <button 
              key={phase}
              style={{
                ...styles.tab,
                ...(activePhase === phase ? styles.activeTab : {})
              }}
              onClick={() => setActivePhase(phase)}
            >
              {phase.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{
        ...styles.systemsGrid,
        gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(3, 1fr)' : 
                              window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr'
      }}>
        {systems.map(system => {
          const summary = getSystemSummary(activePhase, system);
          
          return (
            <div 
              key={system}
              style={{
                ...styles.systemCard,
                ':hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }
              }}
              onClick={() => handleSystemClick(system)}
            >
              <div style={styles.systemHeader}>
                <h2 style={styles.systemTitle}>{system}</h2>
              </div>
              <div style={styles.systemContent}>
                <div style={styles.metricsContainer}>
                  <div style={styles.metricSection}>
                    <div style={styles.progressContainer}>
                      <div style={styles.circularProgress}>
                        {/* Background circle */}
                        <svg viewBox="0 0 36 36">
                          <circle 
                            style={styles.progressBg}
                            cx="18" 
                            cy="18" 
                            r="16" 
                          />
                        </svg>
                        
                        {/* Bad metrics circle (complete circle) */}
                        <svg style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          transform: 'rotate(-90deg)'
                        }} viewBox="0 0 36 36">
                          <circle 
                            style={styles.progressValueBad}
                            cx="18" 
                            cy="18" 
                            r="16" 
                            strokeDasharray="100"
                            strokeDashoffset="0"
                          />
                        </svg>
                        
                        {/* Good metrics arc (partial circle) */}
                        <svg style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          transform: 'rotate(-90deg)'
                        }} viewBox="0 0 36 36">
                          <circle 
                            style={styles.progressValueGood}
                            cx="18" 
                            cy="18" 
                            r="16" 
                            strokeDasharray="100"
                            strokeDashoffset={summary.total === 0 ? 100 : 100 - ((summary.good / summary.total) * 100)}
                          />
                        </svg>
                        
                        {/* Center label with better styling */}
                        <div style={{...styles.progressLabelContainer, boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.05)'}}>
                          <div style={{textAlign: 'center', background: 'white', borderRadius: '50%', width: '70%', height: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                            <div style={{fontSize: '22px', fontWeight: '700', color: '#111827'}}>{summary.total}</div>
                            <div style={{fontSize: '12px', color: '#6b7280', marginTop: '-2px'}}>metrics</div>
                          </div>
                        </div>
                      </div>
                    </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '12px', gap: '16px'}}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '14px', height: '14px', backgroundColor: '#10b981', borderRadius: '50%', marginRight: '6px'}}></div>
                        <span style={{fontSize: '14px', fontWeight: '600', color: '#059669'}}>{summary.good} Good</span>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '14px', height: '14px', backgroundColor: '#f43f5e', borderRadius: '50%', marginRight: '6px'}}></div>
                        <span style={{fontSize: '14px', fontWeight: '600', color: '#dc2626'}}>{summary.bad} Bad</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={styles.metricsFooter}>
                  <p style={styles.totalMetrics}>{summary.total} total metrics</p>
                  <p style={styles.clickHint}>Click for details</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {dialogOpen && selectedSystem && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialog}>
            <div style={styles.dialogHeader}>
              <h2 style={styles.dialogTitle}>{selectedSystem} Details - {activePhase.toUpperCase()}</h2>
              <button 
                onClick={closeDialog}
                style={styles.closeButton}
              >
                ✕
              </button>
            </div>
            <div style={styles.dialogContent}>
              <table style={styles.metricsTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Metric</th>
                    <th style={styles.tableHeader}>Current Count</th>
                    <th style={styles.tableHeader}>Previous Count</th>
                    <th style={styles.tableHeader}>Current Errors</th>
                    <th style={styles.tableHeader}>Previous Errors</th>
                    <th style={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data[activePhase][selectedSystem]).map(metricName => {
                    const metric = data[activePhase][selectedSystem][metricName];
                    const isBad = isMetricBad(metric);
                    const hasCountDropped = metric.lastday_count > 0 && metric.count < 0.9 * metric.lastday_count;
                    
                    return (
                      <tr key={metricName} style={isBad ? { ...styles.tableCell, ...styles.badRow } : { ...styles.tableCell, ...styles.goodRow }}>
                        <td style={{ ...styles.tableCell, ...styles.metricName }}>{metricName}</td>
                        <td style={styles.tableCell}>{metric.count}</td>
                        <td style={styles.tableCell}>{metric.lastday_count}</td>
                        <td style={styles.tableCell}>{metric.erorr}</td>
                        <td style={styles.tableCell}>{metric.lastday_error}</td>
                        <td style={styles.tableCell}>
                          {isBad ? (
                            <span style={styles.statusBadgeBad}>
                              Bad
                              {metric.erorr > 0 && " (Has errors)"}
                              {metric.lastday_error > 0 && " (Had errors)"}
                              {hasCountDropped && " (Count dropped)"}
                            </span>
                          ) : (
                            <span style={styles.statusBadgeGood}>
                              Good
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={styles.dialogFooter}>
              <button 
                onClick={closeDialog}
                style={styles.closeDialogButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsDashboard;