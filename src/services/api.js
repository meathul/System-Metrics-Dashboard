const API_BASE_URL = 'http://localhost:8080';

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  console.log('Current token:', token);
  return token;
};

const authFetch = async (url, options = {}) => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.error('No token found - redirecting to login');
      window.location.href = '/login';
      return null;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    console.log('Making request to:', url);
    console.log('With headers:', headers);

    const response = await fetch(url, { 
      ...options, 
      headers,
    });

    console.log('Response status:', response.status);
    
    if (response.status === 401) {
      console.error('Unauthorized - clearing token and redirecting');
      localStorage.removeItem('token');
      window.location.href = '/login';
      return null;
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

export const fetchMetricsData = async () => {
  try {
    const response = await authFetch(`${API_BASE_URL}/profile/SystemMetrics`);
    if (!response) return null;
    return await response.json();
  } catch (error) {
    console.error('Metrics error:', error);
    return null;
  }
};

export const fetchUtilizationData = async (interval = '15min') => {
  try {
    const response = await authFetch(`${API_BASE_URL}/profile/utilization?interval=${interval}`);
    if (!response) return null;
    return await response.json();
  } catch (error) {
    console.error('Utilization error:', error);
    return null;
  }
};
