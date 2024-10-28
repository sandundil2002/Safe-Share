<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=50&pause=1000&center=true&vCenter=true&width=835&height=70&lines=Safe+Share" alt="Typing SVG" /></a>

<p align="center"><img src="/img/safe-share-1.png" alt="project-image"></p>

<p id="description">Safe Share is a secure and user-friendly file storage and sharing platform leveraging Firebase services for real-time database management authentication and file storage. The platform allows users to upload store view share and manage their files ensuring secure access control and smooth file handling via a simple interface.</p>

<h2>🚀 Demo</h2>

[https://sandundil2002.github.io/Safe-Share/](https://sandundil2002.github.io/Safe-Share/)  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   User Authentication:
    * Users can securely sign up or log in to their accounts using Firebase Authentication.
    * Authentication state persists across sessions for better user experience.
    
*   File Upload:
    * Users can upload files securely to Firebase Storage.
    * File metadata (such as filename, upload timestamp, and download URL) is stored in Firebase Realtime Database for easy management.
      
*   View Uploaded Files:
    * Uploaded files are displayed dynamically as image cards in the dashboard, with options to copy the link or delete the file.
      
*   Copy Link:
    * Users can generate and copy public file URLs with a single click to share with others.
      
*   Delete Files:
    * Users can securely delete their files from Firebase Storage, and the corresponding metadata is removed from the Firebase Realtime Database.
      
*   Real-time Feedback:
    * A progress bar is displayed during file uploads to track the upload percentage in real time.
    * Success or failure alerts are shown using SweetAlert popups for a seamless user experience.
    
*   Responsiveness:
    * The application is designed to be fully responsive, ensuring usability across a range of devices (mobile, tablet, desktop).
  
<h2>Project Screenshots:</h2>

<img src="/img/safe-share-2.png" alt="project-screenshot" width="700" height="400/">
<img src="/img/safe-share-3.png" alt="project-screenshot" width="700" height="400/">
<img src="/img/safe-share-7.png" alt="project-screenshot" width="700" height="400/">
<img src="/img/safe-share-4.png" alt="project-screenshot" width="700" height="400/">
<img src="/img/safe-share-5.png" alt="project-screenshot" width="700" height="400/">
<img src="/img/safe-share-6.png" alt="project-screenshot" width="700" height="400/">

<h2> Usage Instructions </h2>

1) User Registration & Login
   * Users can register for a new account or log in to an existing one.
   * The profile picture is dynamically generated based on the first letter of their username.
  
2) Uploading Files
   * After logging in, users can access the dashboard to upload files.
   * The uploaded file is stored in Firebase Storage, and the metadata (such as file URL and timestamp) is saved in Firebase Realtime Database.
   * The progress of the file upload is displayed with a real-time progress bar.

3) Managing Files
   * Users can view their uploaded files as image cards.
   * Copy Link: Copy the file URL to share with others.
   * Delete: Remove the file from storage and its corresponding metadata.

4) Logout
   * Users can log out from the application using the "Sign Out" button, which will redirect them to the login page.
   
<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the Repository</p>

```
git clone https://github.com/sandundil2002/Safe-Share.git
```

<p>2. Firebase Setup: Go to the Firebase Console.</p>

<p>3. Create a new Firebase project.</p>

<p>4. Enable Firebase Authentication Realtime Database and Storage in the Firebase console.</p>

<p>5. In the project settings create a new web app and copy the Firebase configuration keys.</p>

<p>6. Add Firebase Configuration</p>

```
const firebaseConfig = {     apiKey: "YOUR_API_KEY"     authDomain: "YOUR_AUTH_DOMAIN"     databaseURL: "YOUR_DATABASE_URL"     projectId: "YOUR_PROJECT_ID"     storageBucket: "YOUR_STORAGE_BUCKET"     messagingSenderId: "YOUR_MESSAGING_SENDER_ID"     appId: "YOUR_APP_ID" };
```

<p>7. Run Locally: You can open index.html directly in your browser or run a local server</p>

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   HTML5: For structuring the layout and defining the components of the app.
*   CSS3: For styling and ensuring a modern responsive design.
*   Bootstrap 5: To create responsive layouts and user-friendly interfaces with prebuilt UI components.
*   JavaScript (ES6+): Used for managing the core functionality including interaction with Firebase services.
*   Firebase Authentication: Provides secure user login and registration functionality.
*   Firebase Realtime Database: Used to store metadata for each file upload such as the file URL name and timestamp.
*   Firebase Storage: Secure cloud storage used for file uploads with download and delete functionality.

<h2>🛡️ License:</h2>

This project is licensed under the MIT License. See the LICENSE file for details.
