/**
 * Time Wizard API Service
 * Template for .NET backend integration
 * Replace BASE_API_URL with your actual backend URL
 */

import http from '../../services/http'; // Use existing http service with auth

const BASE_API_URL = 'https://your-api.com/api'; // Update this

/**
 * Fetch all sectors/teams
 * @returns {Promise<Array>} List of sectors
 */
export const fetchSectors = async () => {
  try {
    const response = await http.get(`${BASE_API_URL}/sectors`);
    return response.data || response.list || [];
  } catch (error) {
    console.error('Error fetching sectors:', error);
    throw error;
  }
};

/**
 * Fetch employees by sector ID
 * @param {number} sectorId - Sector ID
 * @returns {Promise<Array>} List of employees
 */
export const fetchEmployeesBySector = async (sectorId) => {
  try {
    const response = await http.get(`${BASE_API_URL}/sectors/${sectorId}/employees`);
    return response.data || response.list || [];
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

/**
 * Fetch all clients
 * @returns {Promise<Array>} List of clients
 */
export const fetchClients = async () => {
  try {
    const response = await http.get(`${BASE_API_URL}/clients`);
    return response.data || response.list || [];
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

/**
 * Fetch positions by client ID
 * @param {number} clientId - Client ID
 * @returns {Promise<Array>} List of positions
 */
export const fetchPositionsByClient = async (clientId) => {
  try {
    const response = await http.get(`${BASE_API_URL}/clients/${clientId}/positions`);
    return response.data || response.list || [];
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw error;
  }
};

/**
 * Start time tracking session
 * @param {Object} data - Session data
 * @param {number} data.sectorId - Selected sector ID
 * @param {number} data.employeeId - Selected employee ID
 * @param {number} data.clientId - Selected client ID
 * @param {number} data.positionId - Selected position ID
 * @returns {Promise<Object>} Session details with sessionId
 */
export const startTimeTracking = async (data) => {
  try {
    const response = await http.post(`${BASE_API_URL}/time-tracking/start`, {
      sectorId: data.sectorId,
      employeeId: data.employeeId,
      clientId: data.clientId,
      positionId: data.positionId,
      startTime: new Date().toISOString(),
      deviceInfo: {
        platform: Platform.OS,
        appVersion: '1.0.0', // Get from app config
      },
    });
    
    return response.data || response;
  } catch (error) {
    console.error('Error starting time tracking:', error);
    throw error;
  }
};

/**
 * Stop time tracking session
 * @param {number} sessionId - Session ID to stop
 * @param {number} duration - Duration in seconds
 * @returns {Promise<Object>} Updated session details
 */
export const stopTimeTracking = async (sessionId, duration) => {
  try {
    const response = await http.post(`${BASE_API_URL}/time-tracking/${sessionId}/stop`, {
      endTime: new Date().toISOString(),
      duration: duration,
    });
    
    return response.data || response;
  } catch (error) {
    console.error('Error stopping time tracking:', error);
    throw error;
  }
};

/**
 * Get active time tracking session for user
 * @returns {Promise<Object|null>} Active session or null
 */
export const getActiveSession = async () => {
  try {
    const response = await http.get(`${BASE_API_URL}/time-tracking/active`);
    return response.data || response;
  } catch (error) {
    console.error('Error fetching active session:', error);
    throw error;
  }
};

/**
 * Get time tracking history
 * @param {Object} filters - Filter options
 * @param {string} filters.startDate - Start date (ISO string)
 * @param {string} filters.endDate - End date (ISO string)
 * @param {number} filters.page - Page number
 * @param {number} filters.pageSize - Items per page
 * @returns {Promise<Object>} History with pagination
 */
export const getTimeTrackingHistory = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams({
      startDate: filters.startDate || new Date().toISOString(),
      endDate: filters.endDate || new Date().toISOString(),
      page: filters.page || 1,
      pageSize: filters.pageSize || 20,
    }).toString();
    
    const response = await http.get(`${BASE_API_URL}/time-tracking/history?${queryParams}`);
    return response.data || response;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

// Example .NET backend endpoints structure:
/*
POST   /api/time-tracking/start
POST   /api/time-tracking/{id}/stop  
GET    /api/time-tracking/active
GET    /api/time-tracking/history

GET    /api/sectors
GET    /api/sectors/{id}/employees

GET    /api/clients
GET    /api/clients/{id}/positions

Request/Response models:

StartTimeTrackingRequest:
{
  "sectorId": 1,
  "employeeId": 2,
  "clientId": 3,
  "positionId": 4,
  "startTime": "2026-03-10T12:00:00Z",
  "deviceInfo": {
    "platform": "ios",
    "appVersion": "1.0.0"
  }
}

StartTimeTrackingResponse:
{
  "sessionId": 12345,
  "startTime": "2026-03-10T12:00:00Z",
  "status": "active"
}

StopTimeTrackingRequest:
{
  "endTime": "2026-03-10T14:30:00Z",
  "duration": 9000 // seconds
}

StopTimeTrackingResponse:
{
  "sessionId": 12345,
  "duration": 9000,
  "totalAmount": 125.00,
  "status": "completed"
}
*/
