# Time Wizard - Multi-Employee Time Tracking System

A complete time tracking system where supervisors can start and monitor time tracking for multiple employees in their team.

## Features

### ✅ **Time Tracking Wizard (4-Step Process)**
1. **Select Sector/Team** - Choose the department team
2. **Select Employee** - Choose team member (filtered by sector)
3. **Select Client** - Choose the client for time tracking
4. **Select Position** - Choose position/role (filtered by client)

### ✅ **Time Tracking Dashboard**
- **Active Sessions View:** See all employees currently tracking time
- **Live Timers:** Real-time duration display for each active session
- **Session Details:** View employee, client, position, sector for each session
- **Quick Stop:** Stop any tracking session with one tap
- **Session History:** View completed tracking sessions with durations
- **Auto-refresh:** Dashboard updates every second for live timers

### ✅ **Supervisor Features**
- Start time tracking for any employee in their team
- Monitor multiple employees tracking time simultaneously
- See which employee is working for which client on which position
- Stop tracking for any employee
- View historical tracking data
- Prevent duplicate sessions (employee can only have one active session)

### ✅ **Modern Dark UI**
- Matches the design reference with dark theme (#1a1a1a background)
- Color-coded indicators:
  - ✅ **Green (#4CAF50):** Active tracking, completed steps, primary actions
  - 🟠 **Orange (#FF9800):** Pending steps, start tracking
  - 🔴 **Red (#F44336):** Stop tracking, danger actions
- Smooth animations and touch feedback
- Responsive cards and layouts

## File Structure

```
src/screens/TimeWizard/
├── TimeWizard.js                  # 4-step wizard for starting sessions
├── TimeTrackingDashboard.js       # Dashboard showing active sessions & history
├── activeSessionsService.js       # Service managing sessions (AsyncStorage + API)
├── mockData.js                    # Demo data (sectors, employees, clients, positions)
├── styles.js                      # Styling and color constants
└── components/
    └── StepIndicator.js           # Step progress indicator component
```

## How to Use

### 1. Access Time Tracking

From Dashboard:
- **Orange button:** "Start Time Tracking Wizard" - Opens wizard to start new session
- **Green button:** "View Active Tracking Sessions" - Opens dashboard overview

### 2. Start Time Tracking (Wizard)

1. Select a sector/team
2. Select an employee from that team
3. Select a client
4. Select a position for that client
5. Review summary and confirm
6. Session starts and is added to dashboard

**Note:** If the employee already has an active session, you'll be notified and must stop the existing session first.

### 3. Monitor Active Sessions (Dashboard)

- **Active Tab:** Shows all currently tracking employees
  - Real-time timer for each session
  - Employee name, sector, client, position details
  - Tap stop button (🛑) to end session
  
- **History Tab:** Shows completed sessions
  - Duration of each completed session
  - Start and end times
  - Employee and client information

### 4. Stop Time Tracking

From the Dashboard's Active tab:
1. Tap the red stop button (🛑) on any active session
2. Confirm the duration
3. Session moves to history and can be synced to backend

## Demo Data

The app currently uses mock data with:
- **5 Sectors:** Marketing, Development, Sales, Support, Design
- **7 Employees:** Distributed across sectors
- **5 Clients:** SOLARA DOO, DECORO DOOEL, LIGHTING MK, ELEGANCE STUDIO, URBAN INTERIORS
- **10 Positions:** Various roles across clients
- **2 Active Sessions:** Pre-loaded for demo
- **3 History Sessions:** Sample completed sessions

## Backend Integration

### API Endpoints Needed

The `activeSessionsService.js` has placeholders for backend integration:

#### 1. **Start Time Tracking Session**
```http
POST /api/timesessions
Content-Type: application/json

{
  "employeeId": 1,
  "sectorId": 1,
  "clientId": 1,
  "positionId": 1,
  "startTime": "2026-03-10T10:30:00Z"
}

Response:
{
  "sessionId": "abc123",
  "success": true
}
```

#### 2. **Stop Time Tracking Session**
```http
POST /api/timesessions/{sessionId}/stop
Content-Type: application/json

{
  "endTime": "2026-03-10T12:30:00Z",
  "duration": 7200
}

Response:
{
  "success": true,
  "totalDuration": 7200
}
```

#### 3. **Get Active Sessions**
```http
GET /api/timesessions/active

Response:
[
  {
    "id": "session_123",
    "employeeId": 1,
    "sectorId": 1,
    "clientId": 1,
    "positionId": 1,
    "startTime": "2026-03-10T10:30:00Z"
  }
]
```

#### 4. **Get Session History**
```http
GET /api/timesessions/history?limit=50

Response:
[
  {
    "id": "session_123",
    "employeeId": 1,
    "sectorId": 1,
    "clientId": 1,
    "positionId": 1,
    "startTime": "2026-03-10T08:00:00Z",
    "endTime": "2026-03-10T10:00:00Z",
    "duration": 7200
  }
]
```

#### 5. **Get Employee's Active Session**
```http
GET /api/employees/{employeeId}/active-session

Response:
{
  "hasActiveSession": true,
  "sessionId": "abc123",
  "startTime": "2026-03-10T10:30:00Z"
}
```

### Implementing Backend Integration

Update `activeSessionsService.js` function `sendSessionToBackend()`:

```javascript
const sendSessionToBackend = async (session, authToken) => {
  const response = await fetch('https://your-api.com/api/timesessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      employeeId: session.employeeId,
      sectorId: session.sectorId,
      clientId: session.clientId,
      positionId: session.positionId,
      startTime: new Date(session.startTime).toISOString(),
      endTime: new Date(session.endTime).toISOString(),
      duration: session.endTime - session.startTime,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send session to backend');
  }
  
  return await response.json();
};
```

## Data Storage

### AsyncStorage Keys

The system uses AsyncStorage for offline-first functionality:

- `@time_tracking_active_sessions` - Active tracking sessions
- `@time_tracking_history` - Completed sessions history (last 100)

Data persists even if the app is closed, ensuring no tracking time is lost.

## User Workflow

### Supervisor Starting Time for Employee

1. Tap "Start Time Tracking Wizard" from Dashboard
2. Select employee's sector
3. Select the specific employee
4. Select client the employee will work for
5. Select position/role for this work
6. Review summary and tap "Start"
7. Session begins and appears in Dashboard

### Checking Active Sessions

1. Tap "View Active Tracking Sessions" from Dashboard
2. See all employees currently tracking time
3. Each card shows:
   - Employee name with green status dot
   - Sector, Client, Position details
   - Live running timer
   - When the session started
4. Pull to refresh to update data

### Stopping a Session

1. From Active Sessions Dashboard
2. Tap red stop button (🛑) on employee's session
3. Confirm duration
4. Session moves to History tab
5. Data synced to backend

### Viewing History

1. From Dashboard, tap "History" tab
2. See completed sessions with:
   - Employee name
   - Client and position
   - Total duration
   - Start and end times
3. Sorted by most recent first

## Customization

### Colors

Edit colors in `styles.js`:

```javascript
export const WIZARD_COLORS = {
  background: '#1a1a1a',        // Main background
  cardBackground: '#2a2a2a',    // Card/item background
  stepComplete: '#4CAF50',      // Completed step color
  stepActive: '#4CAF50',        // Active step color
  stepPending: '#FF9800',       // Pending step color
  primary: '#4CAF50',           // Primary button color
  secondary: '#FF9800',         // Secondary button color
  danger: '#F44336',            // Danger/stop color
  // ... more colors
};
```

### Labels/Text

Change step labels in `TimeWizard.js`:

```javascript
const STEPS = [
  { id: 1, label: 'SEKTOR', sublabel: 'Izberi sektor' },
  { id: 2, label: 'VRABOTEN', sublabel: 'Izberi vraboten' },
  { id: 3, label: 'KLIENT', sublabel: 'Izberi klient' },
  { id: 4, label: 'POZICIJA', sublabel: 'Izberi pozicija' },
];
```

## Testing

To test the feature in development:

```bash
npx expo start
```

Navigate to the Time Wizard screen and test:
- ✅ All 4 steps navigate correctly
- ✅ Data filters work (employees by sector, positions by client)
- ✅ Back navigation works
- ✅ Timer starts and stops
- ✅ Summary shows correct selections
- ✅ Responsive to screen sizes

## Screenshots

The UI matches the reference design with:
- Dark theme (#1a1a1a background)
- Step indicators at top
- Large, touch-friendly list items
- Color-coded visual feedback
- "Sladen korak" (Next step) footer
- Professional typography

## Future Enhancements

Potential features to add:
- [ ] Save draft selections (AsyncStorage)
- [ ] Recent selections quick access
- [ ] Time history view
- [ ] Export time reports
- [ ] Offline support with sync
- [ ] Push notifications for long sessions
- [ ] Break time tracking
- [ ] Multiple active timers

## Support

For issues or questions about this feature, contact the development team or check the main project README.
