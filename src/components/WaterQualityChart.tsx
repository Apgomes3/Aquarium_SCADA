import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { time: '00:00', temp: 24.2, ph: 8.15, sal: 35.0, orp: 310, do: 7.1, nh3: 0.01, no2: 0.00, no3: 5.0 },
  { time: '04:00', temp: 24.1, ph: 8.12, sal: 35.1, orp: 305, do: 7.0, nh3: 0.02, no2: 0.01, no3: 5.1 },
  { time: '08:00', temp: 24.3, ph: 8.18, sal: 35.2, orp: 315, do: 7.2, nh3: 0.01, no2: 0.00, no3: 5.2 },
  { time: '12:00', temp: 24.6, ph: 8.22, sal: 35.1, orp: 325, do: 7.4, nh3: 0.01, no2: 0.00, no3: 5.3 },
  { time: '16:00', temp: 24.8, ph: 8.25, sal: 35.0, orp: 330, do: 7.3, nh3: 0.02, no2: 0.01, no3: 5.4 },
  { time: '20:00', temp: 24.5, ph: 8.20, sal: 35.1, orp: 320, do: 7.2, nh3: 0.01, no2: 0.00, no3: 5.2 },
  { time: '24:00', temp: 24.4, ph: 8.18, sal: 35.2, orp: 318, do: 7.1, nh3: 0.01, no2: 0.00, no3: 5.1 },
];

interface WaterQualityChartProps {
  parameter?: string;
  tankId?: string;
}

export function WaterQualityChart({ parameter, tankId }: WaterQualityChartProps) {
  // In a real app, we'd fetch data for tankId and parameter
  // For now, we use the mock data
  
  const getParameterConfig = (param: string) => {
    switch (param) {
      case 'temp': return { name: 'Temperature', unit: '°C', color: '#38bdf8' };
      case 'ph': return { name: 'pH', unit: '', color: '#10b981' };
      case 'sal': case 'salinity': return { name: 'Salinity', unit: 'ppt', color: '#f59e0b' };
      case 'orp': return { name: 'ORP', unit: 'mV', color: '#8b5cf6' };
      case 'do': return { name: 'Dissolved Oxygen', unit: 'mg/L', color: '#22d3ee' };
      case 'nh3': return { name: 'Ammonia', unit: 'ppm', color: '#f43f5e' };
      case 'no2': return { name: 'Nitrite', unit: 'ppm', color: '#ec4899' };
      case 'no3': return { name: 'Nitrate', unit: 'ppm', color: '#06b6d4' };
      default: return { name: param, unit: '', color: '#38bdf8' };
    }
  };

  const config = parameter ? getParameterConfig(parameter) : null;

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            yAxisId="left" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            domain={['auto', 'auto']}
            dx={-10}
          />
          {!parameter && (
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              domain={['auto', 'auto']}
              dx={10}
            />
          )}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              borderColor: '#1e293b',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} 
            iconType="circle"
          />
          
          {parameter ? (
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey={parameter} 
              name={`${config?.name} (${config?.unit})`} 
              stroke={config?.color} 
              strokeWidth={3} 
              dot={{ r: 4, fill: config?.color, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: config?.color, stroke: '#0f172a', strokeWidth: 2 }}
            />
          ) : (
            <>
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="temp" 
                name="Temp (°C)" 
                stroke="#38bdf8" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6, fill: '#38bdf8', stroke: '#0f172a', strokeWidth: 2 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="ph" 
                name="pH" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6, fill: '#10b981', stroke: '#0f172a', strokeWidth: 2 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="orp" 
                name="ORP (mV)" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#0f172a', strokeWidth: 2 }}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
