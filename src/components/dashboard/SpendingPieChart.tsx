import { Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { formatRM } from '../../lib/utils';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface SpendingData {
  valorantSpent: number;
  csgoSpent: number;
  subscriptionsSpent: number;
  gamesSpent: number;
}

interface SpendingPieChartProps {
  data: SpendingData;
}

export function SpendingPieChart({ data }: SpendingPieChartProps) {
  const chartData = {
    labels: ['Valorant Skins', 'CS:GO Skins', 'Subscriptions', 'Games'],
    datasets: [
      {
        data: [
          data.valorantSpent,
          data.csgoSpent,
          data.subscriptionsSpent,
          data.gamesSpent,
        ],
        backgroundColor: [
          'rgba(255, 70, 85, 0.8)',    // Valorant Red
          'rgba(222, 155, 53, 0.8)',   // CS:GO Orange
          'rgba(196, 113, 245, 0.8)',  // Purple
          'rgba(0, 212, 255, 0.8)',    // Cyan
        ],
        borderColor: [
          'rgba(255, 70, 85, 1)',
          'rgba(222, 155, 53, 1)',
          'rgba(196, 113, 245, 1)',
          'rgba(0, 212, 255, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Rajdhani', sans-serif",
            size: 12,
            weight: 600,
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: "'Orbitron', sans-serif",
          size: 14,
          weight: 700,
        },
        bodyFont: {
          family: "'Rajdhani', sans-serif",
          size: 13,
        },
        callbacks: {
          label: function(context) {
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return ` ${formatRM(value)} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  const total = data.valorantSpent + data.csgoSpent + data.subscriptionsSpent + data.gamesSpent;

  // If no spending data, show empty state
  if (total === 0) {
    return (
      <div className="glass-card p-6 h-full">
        <h3 className="text-lg font-bold font-orbitron text-white mb-4">
          Spending <span className="gradient-text">Breakdown</span>
        </h3>
        <div className="flex flex-col items-center justify-center h-[250px] text-center">
          <div className="w-16 h-16 rounded-full bg-white/05 flex items-center justify-center mb-4">
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-white/50 text-sm">
            No spending data yet.<br />
            Start tracking to see your breakdown!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <h3 className="text-lg font-bold font-orbitron text-white mb-2">
        Spending <span className="gradient-text">Breakdown</span>
      </h3>
      <p className="text-sm text-white/50 mb-4">
        Total: <span className="text-[#ff6b9d] font-bold">{formatRM(total)}</span>
      </p>
      
      <div className="relative h-[250px]">
        <Doughnut data={chartData} options={options} />
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-white/50 uppercase tracking-wider">Total</p>
            <p className="text-lg font-bold font-orbitron gradient-text">
              {formatRM(total)}
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown list */}
      <div className="mt-6 space-y-2">
        {[
          { label: 'Valorant', value: data.valorantSpent, color: '#ff4655' },
          { label: 'CS:GO', value: data.csgoSpent, color: '#de9b35' },
          { label: 'Subscriptions', value: data.subscriptionsSpent, color: '#c471f5' },
          { label: 'Games', value: data.gamesSpent, color: '#00d4ff' },
        ].map(item => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white/70">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">{formatRM(item.value)}</span>
                <span className="text-white/40 text-xs w-12 text-right">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}