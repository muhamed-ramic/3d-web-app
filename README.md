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
