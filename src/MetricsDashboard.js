import React, { useState, useEffect } from 'react';

const MetricsDashboard = () => {
  const [data, setData] = useState(null);
  const [activePhase, setActivePhase] = useState('phase1');
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const fetchData = async () => {
    try {
      const response = await window.fs.readFile('paste.txt', { encoding: 'utf8' });
      const jsonData = JSON.parse(response);
      setData(jsonData);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };
  
  useEffect(() => {
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
  
  if (!data) {
    return <div style={{ padding: '32px', textAlign: 'center', color: '#4b5563' }}>Loading data...</div>;
  }
  
  const phases = Object.keys(data);
  const systems = data[activePhase] ? Object.keys(data[activePhase]) : [];
  
  const dashboardStyle = {
    padding: '24px',
    width: '50%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    background: 'linear-gradient(to bottom, #fafafa, #f3f4f6)'
  };
  
  const titleStyle = {
    fontSize: '32px',
    fontWeight: 700,
    margin: '0 0 24px 0',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: '-0.5px',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  };
  
  const instructionStyle = {
    textAlign: 'center', 
    marginBottom: '24px', 
    fontSize: '15px', 
    color: '#4b5563'
  };
  
  const tabsContainerStyle = {
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };
  
  const tabsStyle = {
    display: 'flex',
    justifyContent: 'center'
  };
  
  const tabStyle = {
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
  };
  
  const activeTabStyle = {
    ...tabStyle,
    color: '#ffffff',
    backgroundColor: '#4f46e5',
    boxShadow: '0 2px 5px rgba(79, 70, 229, 0.3)'
  };
  
  const scrollContainerStyle = {
    overflowX: 'auto',
    paddingBottom: '12px',
    marginBottom: '16px'
  };
  
  const cardsContainerStyle = {
    display: 'flex',
    gap: '24px',
    minWidth: 'min-content'
  };
  
  const cardStyle = {
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    overflow: 'hidden',
    minWidth: '340px'
  };
  
  const cardHeaderStyle = {
    padding: '18px 20px',
    borderBottom: '1px solid #f3f4f6',
    backgroundColor: '#ffffff'
  };
  
  const cardTitleStyle = {
    fontSize: '20px',
    fontWeight: 700,
    margin: 0,
    textTransform: 'capitalize',
    color: '#111827'
  };
  
  const cardContentStyle = {
    padding: '24px 20px',
    backgroundColor: '#ffffff'
  };
  
  const metricsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  };
  
  const circularProgressStyle = {
    position: 'relative',
    width: '100px',
    height: '100px',
    margin: '0 auto'
  };
  
  const progressBgStyle = {
    fill: 'none',
    stroke: '#f3f4f6',
    strokeWidth: 5
  };
  
  const progressGoodStyle = {
    fill: 'none',
    strokeWidth: 5,
    strokeLinecap: 'round',
    stroke: '#10b981'
  };
  
  const progressBadStyle = {
    fill: 'none',
    strokeWidth: 5,
    strokeLinecap: 'round',
    stroke: '#f43f5e'
  };
  
  const circleOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'rotate(-90deg)'
  };
  
  const centerLabelStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%',
    boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.05)'
  };
  
  const centerContentStyle = {
    textAlign: 'center', 
    background: 'white', 
    borderRadius: '50%', 
    width: '70%', 
    height: '70%', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };
  
  const metricsFooterStyle = {
    textAlign: 'center',
    marginTop: '20px',
    backgroundColor: '#f9fafb',
    padding: '12px',
    borderRadius: '8px'
  };
  
  const dialogOverlayStyle = {
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
  };
  
  const dialogStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxWidth: '900px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  };
  
  const dialogHeaderStyle = {
    padding: '20px 24px',
    borderBottom: '1px solid #f3f4f6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb'
  };
  
  const dialogTitleStyle = {
    fontSize: '22px',
    fontWeight: 700,
    margin: 0,
    color: '#111827'
  };
  
  const closeButtonStyle = {
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
  };
  
  const dialogContentStyle = {
    padding: '24px',
    overflowX: 'auto'
  };
  
  const dialogFooterStyle = {
    padding: '16px 24px',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#f9fafb'
  };
  
  const closeDialogButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'background-color 0.2s'
  };
  
  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  };
  
  const tableHeaderStyle = {
    padding: '14px 16px',
    textAlign: 'left',
    backgroundColor: '#f9fafb',
    fontWeight: 600,
    color: '#374151',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '0.5px'
  };
  
  const tableCellStyle = {
    padding: '14px 16px',
    textAlign: 'left',
    borderBottom: '1px solid #f3f4f6'
  };
  
  const goodRowStyle = {
    backgroundColor: '#f0fdf4'
  };
  
  const badRowStyle = {
    backgroundColor: '#fef2f2'
  };
  
  const metricNameStyle = {
    fontWeight: 600,
    color: '#111827'
  };
  
  const statusBadgeGoodStyle = {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: '#d1fae5',
    color: '#047857'
  };
  
  const statusBadgeBadStyle = {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: '#fee2e2',
    color: '#b91c1c'
  };

  return (
    <div style={dashboardStyle}>
      <h1 style={titleStyle}>Metrics Performance Dashboard</h1>
      <div style={instructionStyle}>
        Scroll horizontally to view all systems
      </div>
      
      <div style={tabsContainerStyle}>
        <div style={tabsStyle}>
          {phases.map(phase => (
            <button 
              key={phase}
              style={activePhase === phase ? activeTabStyle : tabStyle}
              onClick={() => setActivePhase(phase)}
            >
              {phase.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      <div style={scrollContainerStyle}>
        <div style={cardsContainerStyle}>
          {systems.map(system => {
            const summary = getSystemSummary(activePhase, system);
            
            return (
              <div 
                key={system}
                style={cardStyle}
                onClick={() => handleSystemClick(system)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={cardHeaderStyle}>
                  <h2 style={cardTitleStyle}>{system}</h2>
                </div>
                <div style={cardContentStyle}>
                  <div style={metricsContainerStyle}>
                    <div style={circularProgressStyle}>
                      {/* Background circle */}
                      <svg viewBox="0 0 36 36">
                        <circle 
                          style={progressBgStyle}
                          cx="18" 
                          cy="18" 
                          r="16" 
                        />
                      </svg>
                      
                      {/* Bad metrics circle (complete circle) */}
                      <svg style={circleOverlayStyle} viewBox="0 0 36 36">
                        <circle 
                          style={progressBadStyle}
                          cx="18" 
                          cy="18" 
                          r="16" 
                          strokeDasharray="100"
                          strokeDashoffset="0"
                        />
                      </svg>
                      
                      {/* Good metrics arc (partial circle) */}
                      <svg style={circleOverlayStyle} viewBox="0 0 36 36">
                        <circle 
                          style={progressGoodStyle}
                          cx="18" 
                          cy="18" 
                          r="16" 
                          strokeDasharray="100"
                          strokeDashoffset={summary.total === 0 ? 100 : 100 - ((summary.good / summary.total) * 100)}
                        />
                      </svg>
                      
                      {/* Center label with better styling */}
                      <div style={centerLabelStyle}>
                        <div style={centerContentStyle}>
                          <div style={{fontSize: '22px', fontWeight: 700, color: '#111827'}}>{summary.total}</div>
                          <div style={{fontSize: '12px', color: '#6b7280', marginTop: '-2px'}}>metrics</div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '12px', gap: '16px'}}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '14px', height: '14px', backgroundColor: '#10b981', borderRadius: '50%', marginRight: '6px'}}></div>
                        <span style={{fontSize: '14px', fontWeight: 600, color: '#059669'}}>{summary.good} Good</span>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '14px', height: '14px', backgroundColor: '#f43f5e', borderRadius: '50%', marginRight: '6px'}}></div>
                        <span style={{fontSize: '14px', fontWeight: 600, color: '#dc2626'}}>{summary.bad} Bad</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={metricsFooterStyle}>
                    <p style={{fontSize: '15px', fontWeight: 600, color: '#4b5563', margin: 0}}>Click for details</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {dialogOpen && selectedSystem && (
        <div style={dialogOverlayStyle}>
          <div style={dialogStyle}>
            <div style={dialogHeaderStyle}>
              <h2 style={dialogTitleStyle}>{selectedSystem} Details - {activePhase.toUpperCase()}</h2>
              <button 
                onClick={closeDialog}
                style={closeButtonStyle}
              >
                ✕
              </button>
            </div>
            <div style={dialogContentStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Metric</th>
                    <th style={tableHeaderStyle}>Current Count</th>
                    <th style={tableHeaderStyle}>Previous Count</th>
                    <th style={tableHeaderStyle}>Current Errors</th>
                    <th style={tableHeaderStyle}>Previous Errors</th>
                    <th style={tableHeaderStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data[activePhase][selectedSystem]).map(metricName => {
                    const metric = data[activePhase][selectedSystem][metricName];
                    const isBad = isMetricBad(metric);
                    const hasCountDropped = metric.lastday_count > 0 && metric.count < 0.9 * metric.lastday_count;
                    const rowStyle = isBad ? {...tableCellStyle, ...badRowStyle} : {...tableCellStyle, ...goodRowStyle};
                    
                    return (
                      <tr key={metricName}>
                        <td style={{...tableCellStyle, ...metricNameStyle}}>{metricName}</td>
                        <td style={tableCellStyle}>{metric.count}</td>
                        <td style={tableCellStyle}>{metric.lastday_count}</td>
                        <td style={tableCellStyle}>{metric.erorr}</td>
                        <td style={tableCellStyle}>{metric.lastday_error}</td>
                        <td style={tableCellStyle}>
                          {isBad ? (
                            <span style={statusBadgeBadStyle}>
                              Bad
                              {metric.erorr > 0 && " (Has errors)"}
                              {metric.lastday_error > 0 && " (Had errors)"}
                              {hasCountDropped && " (Count dropped)"}
                            </span>
                          ) : (
                            <span style={statusBadgeGoodStyle}>
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
            <div style={dialogFooterStyle}>
              <button 
                onClick={closeDialog}
                style={closeDialogButtonStyle}
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