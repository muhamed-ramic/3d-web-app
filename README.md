3D Model Viewer with React Three Fiber, Next.js, and Firebase
This project demonstrates how to load, position, rotate, and persist 3D models using React Three Fiber, Next.js, and Google's Firebase Firestore as a backend database. It features dynamic switching between a 3D perspective view and a 2D top-down (orthographic) view.
Features

    @react-three/fiber and @react-three/drei: Utilizes these libraries for declarative 3D rendering in React.
    Next.js 14+: A modern full-stack framework for building the application.
    Firebase Firestore: Used to store and retrieve the position and rotation data of the 3D models.
    DRY Code: Reuses model components and lighting setup for both 2D and 3D views.
    Interactive Controls: Sliders (input boxes) for adjusting model positions/rotations and a button to save these changes to the database.
    View Toggle: A button to seamlessly switch between a 3D orbit camera view and a 2D top-down orthographic view.
    Tailwind CSS: Used for styling the interface.

Prerequisites
Before running this project, you need:

    Node.js installed on your machine.
    A Firebase project set up.
    The necessary .glb model files (model2.glb and model3.glb) placed in your project's public directory.

Getting Started
1. Installation
Clone the repository and install the dependencies:
bash

git clone <repository_url>
cd <project_directory>
npm install
# or
yarn install

Pripazite na kôd.
2. Configure Firebase
Create a file named firebase/config.js (matching the import path ./firebase/config) and add your Firebase configuration credentials.
javascript

// ./firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

3. Set up Firestore Database
You need a models collection in your Firestore database. The application expects two specific documents with pre-defined IDs to manage the two models:
Collection Name	Document ID	Fields (example values)
models	hAFTwHr4whneGpHAbOWU	position: [0, 0, 0], scale: 2.7, rotation: [0, 0, 0]
models	ikwPrNkY5G1ugZxwcKIn	position: [-3, 0, 0], scale: 2.7, rotation: [0, 0, 0]
The application reads from and writes to these exact document IDs when fetching data on load or saving changes.
4. Add 3D Models
Place your 3D model files (model2.glb, model3.glb) inside the public/ directory in the root of your Next.js project.
5. Run the Application
Start the development server:
bash

npm run dev
# or
yarn dev


    Adjust Properties: Use the input fields to modify the X, Y, and Z positions and rotations for both models. The view will update in real-time.
    Save Changes: Click "Save to DB" to persist the current positions and rotations to your Firebase Firestore database.
    Toggle View: Click "Switch to 2D View" to switch to an orthographic (top-down) projection, useful for precise spatial planning or mapping.
