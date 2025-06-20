import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { loginManually } from '../utils/loginManually';

const SystemMetricsContext = createContext();

export const useSystemMetrics = () => {
  const context = useContext(SystemMetricsContext);
  if (!context) {
    throw new Error('useSystemMetrics must be used within a SystemMetricsProvider');
  }
  return context;
};

export const SystemMetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    cpu: { usage_percent: 24 },
    memory: { used_percent: 58, total_gb: 32 },
    storage: { used_percent: 64, total_gb: 128 },
    weather: { temperature: 0, humidity: 0 },
  });
  const [usePlaceholder, setUsePlaceholder] = useState(false);

  const roundMetrics = (data) => ({
    cpu: { usage_percent: Math.round(data.cpu.usage_percent) },
    memory: {
      used_percent: Math.round(data.memory.used_percent),
      total_gb: Math.round(data.memory.total_gb),
    },
    storage: {
      used_percent: Math.round(data.storage.used_percent),
      total_gb: Math.round(data.storage.total_gb),
    },
    weather: {
      temperature: Math.round(data.weather.temperature),
      humidity: Math.round(data.weather.humidity),
    },
  });

  const city = 'kochi';

  const fetchMetrics = useCallback(async (retrying = false) => {
    try {
      let token = localStorage.getItem('token');
      if (!token) throw new Error('No token found in localStorage');

      const sysRes = await fetch('http://localhost:8080/profile/SystemMetrics', {
        headers: { Authorization: token },
      });

      if (sysRes.status === 401 && !retrying) {
        const newToken = await loginManually();
        if (newToken) return await fetchMetrics(true);
        throw new Error('Auto-login failed');
      }

      if (!sysRes.ok) throw new Error(`Failed to fetch system metrics with status ${sysRes.status}`);
      const sysData = await sysRes.json();

      const weatherRes = await fetch(`http://localhost:8080/profile/weather/${city}`, {
        headers: { Authorization: token },
      });

      if (weatherRes.status === 401 && !retrying) {
        const newToken = await loginManually();
        if (newToken) return await fetchMetrics(true);
        throw new Error('Auto-login failed for weather');
      }

      if (!weatherRes.ok) throw new Error(`Failed to fetch weather with status ${weatherRes.status}`);
      const weatherData = await weatherRes.json();

      const combinedData = {
        ...sysData,
        weather: {
          temperature: weatherData.temperature,
          humidity: weatherData.humidity,
        },
      };

      const rounded = roundMetrics(combinedData);
      setMetrics(rounded);
      console.log('Updated metrics:', rounded);
      setUsePlaceholder(false);
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setUsePlaceholder(true);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  return (
    <SystemMetricsContext.Provider value={{ metrics, usePlaceholder }}>
      {children}
    </SystemMetricsContext.Provider>
  );
};
