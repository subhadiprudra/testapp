import React, { PureComponent } from 'react';
import data from './x.json';

class MetricsDashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      activePhase: 'phase1',
      selectedSystem: null,
      dialogOpen: false,
      isRefreshing: false,
      toast: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ isRefreshing: true });
    try {
      // Simulating data fetch - in a real scenario, you'd fetch from an API
      this.setState({ 
        data: data, 
        isRefreshing: false 
      });
    } catch (error) {
      console.error('Error reading file:', error);
      this.setState({ 
        isRefreshing: false 
      });
      this.showToast('Failed to refresh data', 'error');
    }
  };

  showToast = (message, type) => {
    this.setState({ 
      toast: { message, type } 
    }, () => {
      setTimeout(() => {
        this.setState({ toast: null });
      }, 3000);
    });
  };

  isMetricBad = (metric) => {
    return (
      metric.erorr > 0 || 
      (metric.lastday_count > 0 && metric.count < 0.9 * metric.lastday_count) ||
      metric.lastday_error > 0
    );
  };

  getSystemSummary = (phase, system) => {
    const { data } = this.state;
    if (!data) return { total: 0, bad: 0, metrics: {} };
    
    const systemData = data[phase][system];
    const metrics = Object.keys(systemData);
    
    const badMetrics = metrics.filter(metricName => this.isMetricBad(systemData[metricName]));
    
    return {
      total: metrics.length,
      bad: badMetrics.length,
      good: metrics.length - badMetrics.length,
      metrics: systemData
    };
  };

  handleSystemClick = (system) => {
    this.setState({
      selectedSystem: system,
      dialogOpen: true
    });
  };

  closeDialog = () => {
    this.setState({
      dialogOpen: false,
      selectedSystem: null
    });
  };

  setActivePhase = (phase) => {
    this.setState({ activePhase: phase });
  };

  renderSystemCard = (system) => {
    const { activePhase } = this.state;
    const summary = this.getSystemSummary(activePhase, system);
    
    return (
      <div 
        key={system}
        style={{
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          backgroundColor: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          minWidth: '350px',
          border: '1px solid #f1f5f9'
        }}
        onClick={() => this.handleSystemClick(system)}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
        }}
      >
        {/* System card content (same as previous implementation) */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid #f1f5f9',
          backgroundColor: '#f8fafc'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 700,
            margin: 0,
            textTransform: 'capitalize',
            color: '#1e293b'
          }}>{system}</h2>
        </div>
        {/* Rest of the system card rendering */}
        <div style={{
          padding: '20px',
          backgroundColor: '#ffffff'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            {/* Circular progress component */}
            <div style={{
              position: 'relative',
              width: '110px',
              height: '110px',
              margin: '0 auto'
            }}>
              {/* Background circle */}
              <svg viewBox="0 0 36 36">
                <circle 
                  style={{
                    fill: 'none',
                    stroke: '#f1f5f9',
                    strokeWidth: 4.5
                  }}
                  cx="18" 
                  cy="18" 
                  r="16" 
                />
              </svg>
              
              {/* Bad metrics circle */}
              <svg style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'rotate(-90deg)'
              }} viewBox="0 0 36 36">
                <circle 
                  style={{
                    fill: 'none',
                    strokeWidth: 4.5,
                    strokeLinecap: 'round',
                    stroke: '#f43f5e'
                  }}
                  cx="18" 
                  cy="18" 
                  r="16" 
                  strokeDasharray="100"
                  strokeDashoffset="0"
                />
              </svg>
              
              {/* Good metrics arc */}
              <svg style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'rotate(-90deg)'
              }} viewBox="0 0 36 36">
                <circle 
                  style={{
                    fill: 'none',
                    strokeWidth: 4.5,
                    strokeLinecap: 'round',
                    stroke: '#10b981'
                  }}
                  cx="18" 
                  cy="18" 
                  r="16" 
                  strokeDasharray="100"
                  strokeDashoffset={summary.total === 0 ? 100 : 100 - ((summary.good / summary.total) * 100)}
                />
              </svg>
              
              {/* Center label */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.03)'
              }}>
                <div style={{
                  textAlign: 'center', 
                  background: 'white', 
                  borderRadius: '50%', 
                  width: '75%', 
                  height: '75%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{fontSize: '24px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.5px'}}>{summary.total}</div>
                  <div style={{fontSize: '12px', color: '#64748b', marginTop: '-2px', fontWeight: 500}}>metrics</div>
                </div>
              </div>
            </div>
            
            {/* Good/Bad metrics summary */}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px', gap: '16px'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', marginRight: '6px'}}></div>
                <span style={{fontSize: '14px', fontWeight: 600, color: '#059669'}}>{summary.good} Good</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{width: '12px', height: '12px', backgroundColor: '#f43f5e', borderRadius: '50%', marginRight: '6px'}}></div>
                <span style={{fontSize: '14px', fontWeight: 600, color: '#e11d48'}}>{summary.bad} Bad</span>
              </div>
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            marginTop: '20px',
            backgroundColor: '#f8fafc',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#64748b',
            border: '1px solid #f1f5f9'
          }}>
            <p style={{margin: 0}}>Click for details</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { 
      data, 
      activePhase, 
      selectedSystem, 
      dialogOpen, 
      isRefreshing, 
      toast 
    } = this.state;

    if (!data) {
      return <div style={{ padding: '32px', textAlign: 'center', color: '#4b5563' }}>Loading data...</div>;
    }

    const phases = Object.keys(data);
    const systems = data[activePhase] ? Object.keys(data[activePhase]) : [];

    return (
      <div style={{ 
        padding: '30px',
        maxWidth: '1300px',
        margin: '0 auto',
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        minHeight: '100vh'
      }}>
        {/* Existing styles and header remain the same */}
        
        <div style={{textAlign: 'center', marginBottom: '30px', fontSize: '15px', color: '#64748b', fontWeight: 500}}>
          Scroll horizontally to view all systems
        </div>
        
        {/* Phase selection tabs */}
        <div style={{
          marginBottom: '30px',
          backgroundColor: '#f8fafc',
          padding: '8px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {phases.map(phase => {
              const baseTabStyle = {
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: 600,
                background: 'none',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s ease'
              };
              
              const activeStyle = {
                ...baseTabStyle,
                color: '#ffffff',
                backgroundColor: '#3b82f6',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
              };
              
              const inactiveStyle = {
                ...baseTabStyle,
                color: '#64748b'
              };
              
              return (
                <button 
                  key={phase}
                  style={activePhase === phase ? activeStyle : inactiveStyle}
                  onClick={() => this.setActivePhase(phase)}
                >
                  {phase.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Systems scrollable container */}
        <div style={{
          overflowX: 'auto',
          paddingBottom: '15px',
          marginBottom: '20px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9'
        }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            minWidth: 'min-content',
            paddingBottom: '5px'
          }}>
            {systems.map(system => this.renderSystemCard(system))}
          </div>
        </div>

        {/* Dialog and Toast components remain the same as in the original implementation */}
        {dialogOpen && selectedSystem && this.renderSystemDetailsDialog()}
        {toast && this.renderToast()}
      </div>
    );
  }

  renderSystemDetailsDialog() {
    const { activePhase, selectedSystem, data } = this.state;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '900px',
          width: '95%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          {/* Dialog header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8fafc'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              margin: 0,
              color: '#1e293b'
            }}>{selectedSystem} Details - {activePhase.toUpperCase()}</h2>
            <button 
              onClick={this.closeDialog}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#64748b',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.2s',
                backgroundColor: '#f1f5f9'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e2e8f0';
                e.currentTarget.style.color = '#334155';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              ✕
            </button>
          </div>
          <div style={{padding: '24px', overflowX: 'auto'}}>
            <table style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0'
            }}>
              <thead>
                <tr>
                  <th style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    backgroundColor: '#f8fafc',
                    fontWeight: 600,
                    color: '#475569',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e2e8f0'
                  }}>Metric</th>
                  <th style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    backgroundColor: '#f8fafc',
                    fontWeight: 600,
                    color: '#475569',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e2e8f0'
                  }}>Current Count</th>
                  <th style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    backgroundColor: '#f8fafc',
                    fontWeight: 600,
                    color: '#475569',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e2e8f0'
                  }}>Previous Count</th>
                  <th style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    backgroundColor: '#f8fafc',
                    fontWeight: 600,
                    color: '#475569',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e2e8f0'
                  }}>Current Errors</th>
                  <th style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    backgroundColor: '#f8fafc',
                    fontWeight: 600,
                    color: '#475569',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e2e8f0'
                  }}>Previous Errors</th>
                  <th style={{
                    padding: '14px 16px',
                    textAlign: 'left',
                    backgroundColor: '#f8fafc',
                    fontWeight: 600,
                    color: '#475569',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e2e8f0'
                  }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data[activePhase][selectedSystem]).map(metricName => {
                  const metric = data[activePhase][selectedSystem][metricName];
                  const isBad = this.isMetricBad(metric);
                  const hasCountDropped = metric.lastday_count > 0 && metric.count < 0.9 * metric.lastday_count;
                  
                  const cellStyle = {
                    padding: '12px 16px',
                    textAlign: 'left',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '14px',
                    color: '#334155',
                    backgroundColor: isBad ? '#fef2f2' : '#f0fdf4'
                  };
                  
                  const metricNameStyle = {
                    ...cellStyle,
                    fontWeight: 600,
                    color: '#0f172a'
                  };
                  
                  return (
                    <tr key={metricName}>
                      <td style={metricNameStyle}>{metricName}</td>
                      <td style={cellStyle}>{metric.count}</td>
                      <td style={cellStyle}>{metric.lastday_count}</td>
                      <td style={cellStyle}>{metric.erorr}</td>
                      <td style={cellStyle}>{metric.lastday_error}</td>
                      <td style={cellStyle}>
                        {isBad ? (
                          <span style={{
                            display: 'inline-block',
                            padding: '5px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: '#fee2e2',
                            color: '#991b1b',
                            border: '1px solid #fecaca'
                          }}>
                            Bad
                            {metric.erorr > 0 && " (Has errors)"}
                            {metric.lastday_error > 0 && " (Had errors)"}
                            {hasCountDropped && " (Count dropped)"}
                          </span>
                        ) : (
                          <span style={{
                            display: 'inline-block',
                            padding: '5px 10px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: '#dcfce7',
                            color: '#166534',
                            border: '1px solid #bbf7d0'
                          }}>
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
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: '#f8fafc'
          }}>
            <button 
              onClick={this.closeDialog}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderToast() {
    const { toast } = this.state;
    
    return (
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '12px 20px',
          borderRadius: '8px',
          backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out',
          fontSize: '14px',
          fontWeight: 600
        }}
      >
        {toast.type === 'success' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12" y2="16"></line>
          </svg>
        )}
        {toast.message}
      </div>
    );
  }
}

export default MetricsDashboard;