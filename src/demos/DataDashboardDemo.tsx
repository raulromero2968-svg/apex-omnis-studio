import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Animated counter component
function AnimatedNumber({ value, prefix = '', suffix = '', duration = 2000 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function DataDashboardDemo() {

  // Business Intelligence Bar Chart Data
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [100, 110, 125, 140, 160, 180, 210, 240, 220, 250, 280, 260],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#22d3ee',
        bodyColor: '#fff',
        borderColor: '#22d3ee',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: 'rgba(55, 65, 81, 0.3)',
        },
        ticks: {
          color: '#9ca3af',
          callback: (value: any) => value + 'k',
        },
      },
    },
  };

  // Growth Line Chart Data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Growth',
        data: [4, 5.5, 6, 7.5, 9, 10.5, 11, 12.5, 13, 14.5, 15.5, 16],
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#22d3ee',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#22d3ee',
        bodyColor: '#fff',
        borderColor: '#22d3ee',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => context.parsed.y + '%',
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: 'rgba(55, 65, 81, 0.3)',
        },
        ticks: {
          color: '#9ca3af',
          callback: (value: any) => value + '%',
        },
      },
    },
  };

  // Category Doughnut Chart Data
  const doughnutData = {
    labels: ['20%', '45%', '20%', '15%'],
    datasets: [
      {
        data: [20, 45, 20, 15],
        backgroundColor: [
          'rgba(34, 211, 238, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          '#22d3ee',
          '#3b82f6',
          '#9333ea',
          '#ec4899',
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#22d3ee',
        bodyColor: '#fff',
        borderColor: '#22d3ee',
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f172a, #000)',
      padding: '2rem',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Data Analytics Platform
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.125rem' }}>
            Real-time business intelligence dashboard
          </p>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Revenue Card */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 211, 238, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Revenue</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22d3ee', marginBottom: '0.5rem' }}>
              <AnimatedNumber value={34560} prefix="$" />
            </div>
            <div style={{ color: '#10b981', fontSize: '0.875rem' }}>
              ▲ <AnimatedNumber value={12} suffix="%" duration={2000} />
            </div>
          </div>

          {/* Cost Card */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 211, 238, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Cost</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22d3ee', marginBottom: '0.5rem' }}>
              <AnimatedNumber value={12500} prefix="$" />
            </div>
            <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>
              ▼ <AnimatedNumber value={3} suffix="%" duration={2000} />
            </div>
          </div>

          {/* Visitors Card */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 211, 238, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Visitors</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22d3ee', marginBottom: '0.5rem' }}>
              <AnimatedNumber value={3120} />
            </div>
            <div style={{ color: '#10b981', fontSize: '0.875rem' }}>
              ▲ <AnimatedNumber value={15} suffix="%" duration={2000} />
            </div>
          </div>

          {/* Growth Card */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 211, 238, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Annual Growth</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22d3ee', marginBottom: '0.5rem' }}>
              <AnimatedNumber value={16} suffix="%" />
            </div>
            <div style={{ color: '#10b981', fontSize: '0.875rem' }}>
              ▲ <AnimatedNumber value={5} suffix="%" duration={2000} />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {/* Business Intelligence Bar Chart */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            gridColumn: 'span 2'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.25rem' }}>Business Intelligence</h3>
            <div style={{ height: '300px' }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Category Doughnut Chart */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '0.75rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.25rem' }}>Category Distribution</h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          {/* Growth Line Chart */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '0.75rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.25rem' }}>Growth Trend</h3>
            <div style={{ height: '300px' }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}