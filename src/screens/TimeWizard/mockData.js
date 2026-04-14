/**
 * Mock data for Time Wizard Demo
 * Replace with actual API calls when backend is ready
 */

export const MOCK_SECTORS = [
  { id: 1, name: 'Marketing', code: 'MKT' },
  { id: 2, name: 'Development', code: 'DEV' },
  { id: 3, name: 'Sales', code: 'SAL' },
  { id: 4, name: 'Support', code: 'SUP' },
  { id: 5, name: 'Design', code: 'DSG' },
];

export const MOCK_EMPLOYEES = [
  { id: 1, name: 'Ivan Petrov', sectorId: 1, email: 'ivan@texxano.com' },
  { id: 2, name: 'Marija Stojanovic', sectorId: 1, email: 'marija@texxano.com' },
  { id: 3, name: 'Nikola Dimitrov', sectorId: 2, email: 'nikola@texxano.com' },
  { id: 4, name: 'Ana Nikolova', sectorId: 2, email: 'ana@texxano.com' },
  { id: 5, name: 'Stefan Jovanovic', sectorId: 3, email: 'stefan@texxano.com' },
  { id: 6, name: 'Elena Kostova', sectorId: 4, email: 'elena@texxano.com' },
  { id: 7, name: 'Darko Markovic', sectorId: 5, email: 'darko@texxano.com' },
];

export const MOCK_CLIENTS = [
  { id: 1, name: 'SOLARA DOO', code: 'SOL', color: '#4CAF50' },
  { id: 2, name: 'DECORO DOOEL', code: 'DEC', color: '#2196F3' },
  { id: 3, name: 'LIGHTING MK', code: 'LIG', color: '#FF9800' },
  { id: 4, name: 'TECH SOLUTIONS', code: 'TCH', color: '#9C27B0' },
  { id: 5, name: 'MODERN DESIGN', code: 'MOD', color: '#F44336' },
];

export const MOCK_POSITIONS = [
  { id: 1, name: 'Project Manager', clientId: 1, rate: 50 },
  { id: 2, name: 'Senior Developer', clientId: 1, rate: 65 },
  { id: 3, name: 'UI/UX Designer', clientId: 2, rate: 45 },
  { id: 4, name: 'Marketing Specialist', clientId: 2, rate: 40 },
  { id: 5, name: 'Sales Representative', clientId: 3, rate: 35 },
  { id: 6, name: 'Technical Support', clientId: 3, rate: 30 },
  { id: 7, name: 'DevOps Engineer', clientId: 4, rate: 70 },
  { id: 8, name: 'QA Tester', clientId: 4, rate: 40 },
  { id: 9, name: 'Graphic Designer', clientId: 5, rate: 45 },
  { id: 10, name: 'Content Writer', clientId: 5, rate: 35 },
];

// Helper functions
export const getEmployeesBySector = (sectorId) => {
  return MOCK_EMPLOYEES.filter(emp => emp.sectorId === sectorId);
};

export const getPositionsByClient = (clientId) => {
  return MOCK_POSITIONS.filter(pos => pos.clientId === clientId);
};

export const getSectorById = (id) => {
  return MOCK_SECTORS.find(s => s.id === id);
};

export const getEmployeeById = (id) => {
  return MOCK_EMPLOYEES.find(e => e.id === id);
};

export const getClientById = (id) => {
  return MOCK_CLIENTS.find(c => c.id === id);
};

export const getPositionById = (id) => {
  return MOCK_POSITIONS.find(p => p.id === id);
};
