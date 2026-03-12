export const initialAlerts = [
  { id: 'ALM-1042', timestamp: '2026-03-07 19:45:22', severity: 'critical', message: 'Protein Skimmer Overflow Detected', system: 'TNK-02', value: '98%', limit: '> 95%', status: 'active', fix: 'Drain Cup & Reset Skimmer' },
  { id: 'ALM-1041', timestamp: '2026-03-07 19:40:15', severity: 'critical', message: 'Chiller Failure / High Temp', system: 'TNK-03', value: '14.5 °C', limit: '> 14.0 °C', status: 'active', fix: 'Switch to Backup Chiller' },
  { id: 'ALM-1040', timestamp: '2026-03-07 18:30:00', severity: 'warning', message: 'Filter Backwash Overdue', system: 'TNK-03', value: '1.2 bar', limit: '> 1.0 bar', status: 'active', fix: 'Initiate Backwash Cycle' },
  { id: 'ALM-1039', timestamp: '2026-03-07 16:15:10', severity: 'info', message: 'Automated Dosing Completed', system: 'TNK-01', value: '500 ml', limit: 'N/A', status: 'resolved', fix: '' },
  { id: 'ALM-1038', timestamp: '2026-03-07 14:20:05', severity: 'warning', message: 'Low Sump Level', system: 'TNK-01', value: '45%', limit: '< 50%', status: 'acknowledged', fix: 'Check Auto Top-Off' },
];
