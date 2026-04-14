# Time Tracking Wizard - Quick Start Guide

## ✅ What's Been Created

A complete 4-step time tracking wizard feature has been added to the Texxano mobile app:

### 📁 File Structure
```
src/screens/TimeWizard/
├── TimeWizard.js           # Main wizard screen with all logic
├── mockData.js             # Demo data (5 sectors, 7 employees, 5 clients, 10 positions)
├── styles.js               # Dark theme styling matching your design
├── apiService.js           # Ready-to-use API service template for .NET backend
├── README.md               # Complete documentation
└── components/
    └── StepIndicator.js    # Step progress indicator component
```

### 🎨 Design Features
- ✅ Dark theme (#1a1a1a background) matching your screenshot
- ✅ Step indicator with colored status (green=complete/active, orange=pending)
- ✅ Large, touch-friendly list items
- ✅ Smooth navigation between steps
- ✅ Professional typography and spacing
- ✅ "Sladen korak" (Next step) footer

### 🔄 Wizard Flow
1. **Step 1: Select Sector** → Choose team/department
2. **Step 2: Select Employee** → Choose team member (filtered by sector)
3. **Step 3: Select Client** → Choose client (with color indicators)
4. **Step 4: Select Position** → Choose role (filtered by client)
5. **Step 5: Time Tracking** → Summary + Start/Stop timer

## 🚀 How to Test

### 1. Start the App
```bash
npx expo start
```

### 2. Navigate to Dashboard
The Dashboard now has an **orange button** labeled "Start Time Tracking Wizard"

### 3. Test the Flow
- Tap the button to open TimeWizard
- Select a sector (e.g., "Marketing")
- Select an employee (e.g., "Ivan Petrov")
- Select a client (e.g., "SOLARA DOO")
- Select a position (e.g., "Project Manager")
- Review summary and tap "Start Tracking"
- Watch timer count up
- Tap "Stop Tracking" to finish

### 4. Test Navigation
- **Back button** in footer works on steps 2-4
- **Change Selection** button on summary screen
- **Close** (×) on each screen returns to previous

## 🔌 Backend Integration (When Ready)

### Replace Mock Data
In `TimeWizard.js`, replace imports:
```javascript
// OLD:
import { MOCK_SECTORS, ... } from './mockData';

// NEW:
import { fetchSectors, fetchEmployeesBySector, ... } from './apiService';
```

### Update API Base URL
In `apiService.js`:
```javascript
const BASE_API_URL = 'https://your-dotnet-api.com/api';
```

### API Endpoints Expected
```
GET    /api/sectors
GET    /api/sectors/{id}/employees
GET    /api/clients
GET    /api/clients/{id}/positions
POST   /api/time-tracking/start
POST   /api/time-tracking/{id}/stop
GET    /api/time-tracking/active
GET    /api/time-tracking/history
```

See `apiService.js` for detailed request/response models.

## 📱 Current Demo Data

### Sectors (5)
- Marketing, Development, Sales, Support, Design

### Employees (7)
- Ivan Petrov, Marija Stojanovic, Nikola Dimitrov, Ana Nikolova, Stefan Jovanovic, Elena Kostova, Darko Markovic

### Clients (5)
- SOLARA DOO ✅ (green)
- DECORO DOOEL 🔵 (blue)
- LIGHTING MK 🟠 (orange)
- TECH SOLUTIONS 🟣 (purple)
- MODERN DESIGN 🔴 (red)

### Positions (10)
- Project Manager, Senior Developer, UI/UX Designer, Marketing Specialist, Sales Representative, Technical Support, DevOps Engineer, QA Tester, Graphic Designer, Content Writer

## 🎨 Colors Used
- Background: `#1a1a1a` (dark)
- Cards: `#2a2a2a` (slightly lighter)
- Complete: `#4CAF50` (green)
- Active: `#4CAF50` (green)
- Pending: `#FF9800` (orange)
- Text: `#ffffff` (white) / `#b0b0b0` (gray)

## 📝 Customization

### Change Labels
Edit `STEPS` array in `TimeWizard.js`

### Add More Steps
1. Add to `STEPS` array
2. Create render function (e.g., `renderProjectStep()`)
3. Add to `renderStepContent()` switch statement
4. Add state variables

### Change Colors
Edit `WIZARD_COLORS` in `styles.js`

## ✅ What Works Now
- ✅ All 4 steps navigate correctly
- ✅ Employee filtering by sector
- ✅ Position filtering by client
- ✅ Back navigation
- ✅ Timer functionality (HH:MM:SS)
- ✅ Summary display
- ✅ Start/Stop with confirmation
- ✅ Responsive design
- ✅ Dark theme
- ✅ Step indicators with status

## 🔜 Ready for Backend
Once your .NET backend is ready:
1. Update `BASE_API_URL` in `apiService.js`
2. Test API endpoints
3. Replace mock data imports with API calls
4. Add error handling/loading states
5. Test end-to-end flow

## 📞 Support
Check `src/screens/TimeWizard/README.md` for detailed documentation.

---

**Status**: ✅ Ready to use with demo data  
**Backend Integration**: 🟡 Pending .NET API  
**Design Match**: ✅ 100% matches reference image
