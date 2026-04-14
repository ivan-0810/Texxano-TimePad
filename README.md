**Command for Build**
eas build -p android --profile preview
eas build -p ios --profile preview
eas build --profile development --platform android
eas build --profile development --platform ios
eas update --channel preview --platform android --message "my first update"
eas update --channel preview --platform ios --message "my first update"
eas update --branch preview --message "Your update message"
eas update --branch production --message "Chat features and performance improvements"
npx expo run:android
eas device:create

set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.103
set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.242
set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.19
set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.158

#mac commands
# getting ip address
ipconfig getifaddr en0
set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.28

**File Setting**
src/utils/settings.js

BASE_URL_API
Version App
ApiKey
GoogleClientId
GoogleAndroidClientId
GoogleIOSClientId
GoogleMapsKey


#pnevmatic repo

### For Android:
```bash
eas build --profile mad-studio --platform android
```

### For iOS:
```bash
eas build --profile mad-studio --platform ios
```

### For Both Platforms:
```bash
eas build --profile mad-studio --platform all


eas update --branch mad-studio --message ""
