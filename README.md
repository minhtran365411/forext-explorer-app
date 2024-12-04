
# A Foxes Tale - Productivity App

## App Summary
**A Foxes Tale** is a social/productivity app designed to help users track their daily goals and stay motivated. Users can create goals with sub-goals, track progress daily, and earn coins based on performance. These coins can be exchanged for accessories in **A Foxes Tale Game**. Additionally, users can connect with friends, like and comment on posts, and view their friends’ progress to encourage productivity.

## App Guide
Follow these steps to use **A Foxes Tale**:  
1. Visit [A Foxes Tale Website](https://afoxestale.wixsite.com/afoxestale).  
2. Navigate to the Download Page and download the APK file to your Android device.  
3. Click “Install” after downloading.  
4. Launch the app and start exploring!  

## Technologies Used

### React Native
React Native was chosen for its cross-platform capabilities, allowing the app to run on both iOS and Android with a single codebase. Its similarity to React.js and JavaScript logic also made it efficient for development, especially given the developer’s prior experience.

### OpenAI
OpenAI’s **Turbo 3.5** model is integrated to assist users in breaking large goals into smaller tasks. This feature helps beginners make their goals more manageable. OpenAI credits are available for free within a range of $5-$18.

### Firebase
Google’s Firebase NoSQL database was used for its quick implementation and multi-platform support, including seamless integration with Unity (C#). Firebase also simplifies tasks like authentication, enhancing development speed.

### Figma
Figma was employed for UI/UX design, laying out screens, components, and logic before development. This ensured clarity in the coding process and reduced confusion.

## Problems Encountered

### 1. Implementing the Daily Tracker System
Initially, implementing a system to reset daily trackers while maintaining streaks was challenging. The solution involved using timestamps (`new Date()` function) to determine new days, update the database, and track task streaks. This approach efficiently checks if goals have expired and calculates days remaining.

### 2. Building the APK File – Cross-Platform Issues
While developing on iOS, Android testing revealed platform-specific issues. For instance, the date/time picker worked well on iOS but kept activating on Android. This was resolved by adding a button to toggle the calendar display.

### 3. Slow Updates Due to Deprecated Technology
Early on, social features like post updates and feed loading used outdated technologies such as **Reducer** and `connect` instead of `useSelector`, slowing down image loading. Additionally, images were initially uploaded in high resolutions (2K/4K), impacting performance. Implementing image downsizing before database uploads significantly improved loading speed.

## Conclusion
Despite challenges, **A Foxes Tale** successfully combines productivity and social interaction to motivate users. Continuous improvements are underway to enhance user experience and maintain cross-platform compatibility.

