import React from "react";
import "./HostMetricsPage.css"; // Ensure this CSS file contains styles for .metrics-charts-row
import GaugeChartPanel from "./components/GaugeChartPanel"; // This is your SemiCircleGauge
import LineChartPanel from "./components/LineChartPanel";
import BarChartPanel from "./components/BarChartPanel";
import { Link } from "react-router-dom";
import { useSystemMetrics } from "./components/MetricsContext";

const green = "#2ecc71";
const red = "#e74c3c";

export default function HostMetricsPage() {
  const { metrics, usePlaceholder } = useSystemMetrics();

  const cpuUsage = usePlaceholder ? 55 : metrics.cpu.usage_percent;
  const memoryUsage = usePlaceholder ? 47 : metrics.memory.used_percent;
  const storageUsage = usePlaceholder ? 80 : metrics.storage.used_percent;
  const gpuUsage = usePlaceholder ? 32 : metrics.gpu?.usage_percent || 0;

  const cpuAppAlloc = usePlaceholder ? [20, 15, 10, 5, 5] : metrics.cpu.app_allocation;
  const memoryAppAlloc = usePlaceholder ? [18, 12, 8, 6, 3] : metrics.memory.app_allocation;
  //const storageAppAlloc = usePlaceholder ? [30, 20, 15, 10, 5] : metrics.storage.app_allocation;
  const gpuAppAlloc = usePlaceholder ? [12, 8, 5, 4, 3] : metrics.gpu?.app_allocation || [];

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <div className="profile-section">
          <div className="profile-avatar">A</div>
          <div>
            <div className="profile-name">Alex Morgan</div>
            <div className="profile-role">Administrator</div>
          </div>
        </div>
        <nav>
          <ul>
            <li>Fleet Map</li>
            <li className="active">Galleons</li>
            <li>Connectivity</li>
            <li>Assets</li>
            <li>My Apps</li>
            <li>Marketplace</li>
            <li>Users & Roles</li>
            <li>Security</li>
          </ul>
        </nav>
        <div className="logout">Logout</div>
      </aside>

      <main className="main">
        <header className="main-header">
          <Link to="/login" className="back-link">&larr; back</Link>
          <div>
            <div className="main-title">GAL-NM-623R</div>
            <div className="main-refresh">LAST REFRESH: {new Date().toLocaleTimeString()}</div>
          </div>
        </header>

        <div className="tabs">
          <Link to="/dashboard/*" className="tab">Overview</Link>
          <div className="tab active">Host Metrics</div>
          <div className="tab">Network Statistics</div>
          <div className="tab">Monitoring and Alerts</div>
        </div>

        <div className="metrics-grid">
          {/* CPU */}
          <div className="metrics-card">
            <div className="metrics-title">CPU</div>
            {/* The "metrics-charts-row" div already serves as the single container */}
            <div className="metrics-charts metrics-charts-row">
              <GaugeChartPanel
                value={cpuUsage}
                max={100}
                label={`${cpuUsage}%`}
                sublabel={`${metrics.cpu.cores ?? "N/A"} cores`}
                color={cpuUsage > 75 ? red : green}
              />
              <BarChartPanel
                data={cpuAppAlloc}
                labels={["App 1", "App 2", "App 3", "App 4", "App 5"]}
                title="Top Apps - CPU Usage"
                unit="%"
              />
            </div>
          </div>

          {/* Memory */}
          <div className="metrics-card">
            <div className="metrics-title">Memory</div>
            {/* Ensuring "metrics-charts" acts as the single container for both */}
            <div className="metrics-charts metrics-charts-row"> {/* Added metrics-charts-row for consistency and flex behavior */}
              <GaugeChartPanel
                value={memoryUsage}
                max={100}
                label={`${memoryUsage}%`}
                sublabel={`${metrics.memory.total_gb} GB`}
                color={memoryUsage > 75 ? red : green}
              />
              <BarChartPanel
                data={memoryAppAlloc}
                labels={["App 1", "App 2", "App 3", "App 4", "App 5"]}
                title="Top Apps - Memory Usage"
                unit="%"
              />
            </div>
          </div>

          {/* Storage - Keeping LineChartPanel here, as you didn't specify changing it to BarChartPanel */}
          <div className="metrics-card">
            <div className="metrics-title">Storage</div>
            {/* If you want LineChartPanel and GaugeChartPanel side-by-side, apply metrics-charts-row */}
            <div className="metrics-charts metrics-charts-row">
              <GaugeChartPanel
                value={storageUsage}
                max={100}
                label={`${storageUsage}%`}
                sublabel={`${metrics.storage.total_gb} GB`}
                color={storageUsage > 75 ? red : green}
              />
              <LineChartPanel
                title="Top Apps - Storage Utilization"
                min={0}
                max={100}
                last={storageUsage}
                unit="%"
              />
            </div>
          </div>

          {/* GPU */}
          <div className="metrics-card">
            <div className="metrics-title">GPU</div>
            {/* Ensuring "metrics-charts" acts as the single container for both */}
            <div className="metrics-charts metrics-charts-row"> {/* Added metrics-charts-row for consistency and flex behavior */}
              <GaugeChartPanel
                value={gpuUsage}
                max={100}
                label={`${gpuUsage}%`}
                sublabel={`${metrics.gpu?.cores ?? "N/A"} cores`}
                color={gpuUsage > 75 ? red : green}
              />
              <BarChartPanel
                data={gpuAppAlloc}
                labels={["App 1", "App 2", "App 3", "App 4", "App 5"]}
                title="Top Apps - GPU Usage"
                unit="%"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}