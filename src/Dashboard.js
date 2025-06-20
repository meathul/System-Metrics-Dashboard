import React from "react";
import "./App.css";
import GaugeChartPanel from "./components/GaugeChartPanel";
import LineChartPanel from "./components/LineChartPanel";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { useSystemMetrics } from "./components/MetricsContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const green = "#2ecc71";
const red = "#e74c3c";

export default function Dashboard() {
  const { metrics, usePlaceholder } = useSystemMetrics();

  // Use placeholder values when data not ready or failed
  const cpuUsage = usePlaceholder ? 90 : metrics.cpu.usage_percent;
  const memoryUsage = usePlaceholder ? 60 : metrics.memory.used_percent;
  const storageUsage = usePlaceholder ? 38 : metrics.storage.used_percent;

  // Use real weather data from metrics, fallback to placeholders
  const temperature = usePlaceholder || !metrics.weather
    ? 76
    : Math.round(metrics.weather.temperature * 9 / 5 + 32); // Convert °C to °F
  const humidity = usePlaceholder || !metrics.weather
    ? 45
    : Math.round(metrics.weather.humidity);

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
          <div className="tab active">Overview</div>
          <Link to="/host-metrics" className="tab">Host Metrics</Link>
          <div className="tab">Network Statistics</div>
          <div className="tab">Monitoring and Alerts</div>
        </div>

        <div className="top-panels">
          {/* Overview Panel */}
          <div className="info-panel">
            <div className="info-header">
              <span className="info-title">GAL-NM-623R</span>
              <button className="edit-btn">Edit</button>
            </div>
            <div className="info-details">
              <div className="info-col">
                <div className="info-row">
                  <span className="info-label">Status</span>
                  <span className="info-value">
                    <span className="dot green" /> Healthy
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Security</span>
                  <span className="info-value">
                    <span className="dot green" /> Doors Armed
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Temperature</span>
                  <span className="info-value">{temperature}° F</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Humidity</span>
                  <span className="info-value">{humidity}% • Normal</span>
                </div>
              </div>
              <div className="info-col">
                <div className="info-row">
                  <span className="info-label">Fire Suppression</span>
                  <span className="info-value">
                    <span className="dot green" /> Smoke Detection Enabled
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Physical Address</span>
                  <span className="info-value">1922 East Mineral Way S, Tukwila, WA</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Days without Incident</span>
                  <span className="info-value">90 days</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Serial Number</span>
                  <span className="info-value">039183-12B4J1-3316</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Panel */}
          <div className="map-panel">
            <MapContainer
              center={[37.7749, -122.4194]}
              zoom={5}
              style={{ height: "220px", width: "100%", borderRadius: "10px" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              />

              <Marker position={[37.7749, -122.4194]}>
                <Popup>GAL-NM-623R Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Metrics Panels */}
        <div className="metrics-row">
          <div className="metrics-panel">
            <div className="metrics-title">Environmental Metrics</div>
            <div className="metrics-charts">
              <div className="gauge-block">
                <GaugeChartPanel value={temperature} max={120} label={`${temperature}°F`} sublabel="Normal" color={green} />
                <div className="gauge-caption">Temperature</div>
              </div>
              <div className="gauge-block">
                <GaugeChartPanel value={humidity} max={100} label={`${humidity}%`} sublabel="Normal" color={green} />
                <div className="gauge-caption">Humidity</div>
              </div>
            </div>
          </div>
          <div className="metrics-panel host-metrics-panel">
            <div className="metrics-title">Host Metrics</div>
            <div className="metrics-charts host-metrics-charts">
              <div className="gauge-block">
                <GaugeChartPanel
                  value={cpuUsage}
                  max={100}
                  label={`${cpuUsage}%`}
                  sublabel={`${metrics.cpu.cores ?? 'N/A'} cores`}
                  color={cpuUsage > 75 ? red : green}
                />
                <div className="gauge-caption">CPU Utilization</div>
              </div>
              <div className="gauge-block">
                <GaugeChartPanel
                  value={memoryUsage}
                  max={100}
                  label={`${memoryUsage}%`}
                  sublabel={`${metrics.memory.total_gb} GB`}
                  color={memoryUsage > 75 ? red : green}
                />
                <div className="gauge-caption">Memory Utilization</div>
              </div>
              <div className="gauge-block">
                <GaugeChartPanel
                  value={storageUsage}
                  max={100}
                  label={`${storageUsage}%`}
                  sublabel={`${metrics.storage.total_gb} GB`}
                  color={storageUsage > 75 ? red : green}
                />
                <div className="gauge-caption">Storage Utilization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Utilization Graphs */}
        <div className="utilization-graphs-panel min-h-96">
          <div className="utilization-graphs-header">
            <div className="utilization-graphs-title">Utilization Graphs</div>
            <select className="utilization-graphs-dropdown">
              <option>Every 15min</option>
              <option>Every 30min</option>
              <option>Every 1hr</option>
            </select>
          </div>

          {/* Responsive grid for charts */}
          <div className="utilization-graphs-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <LineChartPanel title="CPU Utilization" min={0} max={90} last={cpuUsage} unit="%" />
            <LineChartPanel title="Memory Utilization" min={0} max={70} last={memoryUsage} unit="%" />
            <LineChartPanel title="Storage Utilization" min={0} max={55} last={storageUsage} unit="%" />
          </div>
        </div>
      </main>
    </div>
  );
}
