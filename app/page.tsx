"use client";

import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Bounds, useGLTF } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { useState } from "react";
import { db } from "./firebase/config";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";

const Model = ({
  url,
  position,
  scale,
  rotation
}: {
  url: string;
  position: number[];
  scale: number;
  rotation: number[];
}) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
};

const lighting = (
  <>
    <directionalLight position={[5, 10, 5]} intensity={2} />
    <ambientLight intensity={0.8} />
  </>
);

// --- 2D Top-Down Viewer Component ---

export default function Home() {
  const [modelPositions, setModelPositions] = useState([
    { position: [0, 0, 0], scale: 2.7, rotation: [0, 0, 0] },
    { position: [-3, 0, 0], scale: 2.7, rotation: [0, 0, 0] },
  ]);
  const [is3DView, setIs3DView] = useState(true);
  const toggleView = () => setIs3DView(!is3DView);
  const [loading, setLoading] = useState(false);

  const commonModels = (
    <Suspense fallback={null}>
      {/* We use the same positions in both views */}
      <Model
        url="/model2.glb"
        position={modelPositions[0].position}
        scale={modelPositions[0].scale}
        rotation={modelPositions[0].rotation}
      />
      <Model
        url="/model3.glb"
        position={modelPositions[1].position}
        scale={modelPositions[1].scale}
        rotation={modelPositions[1].rotation}
      />
    </Suspense>
  );

  const ThreeDViewer = () => (
    <Canvas
      style={{ width: "100vw", height: "600px" }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      {lighting}
      <Bounds fit clip observe margin={1.2}>
        {commonModels}
      </Bounds>
      <OrbitControls />
    </Canvas>
  );
  const TwoDTopDownViewer = () => {
    // We explicitly configure the camera here to be Orthographic and top-down
    const cameraSettings = {
      // We need to define size based on aspect ratio for Orthographic
      near: 0.1,
      far: 1000,
      position: [0, 20, 0] as [number, number, number], // Position high on Y
      orthographic: true, // Key property for 2D view
    };

    return (
      <Canvas
        style={{ width: "100vw", height: "600px" }}
        camera={cameraSettings}
      >
        {lighting}
        {commonModels}
        <OrbitControls />
        {/* No OrbitControls needed for a static 2D view */}
      </Canvas>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "models"));
        const models = querySnapshot.docs.map((doc) => doc.data());
        console.log(models);
        setModelPositions(
          models.map((model) => ({
            position: model.position,
            scale: model.scale,
            rotation: model.rotation,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePositionChange = (index: number, axis: number, value: number) => {
    setModelPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index].position[axis] = value;
      return newPositions;
    });
  };
  const handleRotationChange = (index: number, axis: number, value: number) => {
    setModelPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index].rotation[axis] = value;
      return newPositions;
    });
  };
  const saveToDB = async () => {
    try {
      setLoading(true);
      await setDoc(doc(db, "models", "hAFTwHr4whneGpHAbOWU"), {
        position: modelPositions[0].position,
        scale: modelPositions[0].scale,
        rotation: modelPositions[0].rotation,
      });
      await setDoc(doc(db, "models", "ikwPrNkY5G1ugZxwcKIn"), {
        position: modelPositions[1].position,
        scale: modelPositions[1].scale,
        rotation: modelPositions[1].rotation,
      });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="p-5 text-3xl font-bold text-center">
        Loading glb models using react three fiber.
      </h1>
      <div className="flex justify-center p-4">
        
      </div>
      <div className="p-20 flex justify-between">
        <div className="">
          <h2 className="text-xl font-bold">Position - model1 - x, y, z</h2>
          <input defaultValue={modelPositions[0].position[0]} type="number" onChange={(e) => handlePositionChange(0, 0, Number(e.target.value))} placeholder="X" />
          <input defaultValue={modelPositions[0].position[1]} type="number" onChange={(e) => handlePositionChange(0, 1, Number(e.target.value))} placeholder="Y" />
          <input defaultValue={modelPositions[0].position[2]} type="number" onChange={(e) => handlePositionChange(0, 2, Number(e.target.value))} placeholder="Z" />
          <h2 className="text-xl font-bold">Rotation - model1 - x, y, z</h2>
          <input defaultValue={modelPositions[0].rotation[0]} type="number" onChange={(e) => handleRotationChange(0, 0, Number(e.target.value))} placeholder="X" />
          <input defaultValue={modelPositions[0].rotation[1]} type="number" onChange={(e) => handleRotationChange(0, 1, Number(e.target.value))} placeholder="Y" />
          <input defaultValue={modelPositions[0].rotation[2]} type="number" onChange={(e) => handleRotationChange(0, 2, Number(e.target.value))} placeholder="Z" />
        </div>
        <div className="">
          <h2 className="text-xl font-bold">Position - model2 - x,y, z</h2>
          <input defaultValue={modelPositions[1].position[0]} type="number" onChange={(e) => handlePositionChange(1, 0, Number(e.target.value))} placeholder="X" />
          <input defaultValue={modelPositions[1].position[1]} type="number" onChange={(e) => handlePositionChange(1, 1, Number(e.target.value))} placeholder="Y" />
          <input defaultValue={modelPositions[1].position[2]} type="number" onChange={(e) => handlePositionChange(1, 2, Number(e.target.value))} placeholder="Z" />
          <h2 className="text-xl font-bold">Rotation - model2 - x,y, z</h2>
          <input defaultValue={modelPositions[1].rotation[0]} type="number" onChange={(e) => handleRotationChange(1, 0, Number(e.target.value))} placeholder="X" />
          <input defaultValue={modelPositions[1].rotation[1]} type="number" onChange={(e) => handleRotationChange(1, 1, Number(e.target.value))} placeholder="Y" />
          <input defaultValue={modelPositions[1].rotation[2]} type="number" onChange={(e) => handleRotationChange(1, 2, Number(e.target.value))} placeholder="Z" />
        </div>
      </div>
      <div className="text-center">
        {loading ? <p>Saving...</p> : <button onClick={saveToDB} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer">Save to DB</button>}
        <button
          onClick={toggleView}
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
        >
          Switch to {is3DView ? "2D View" : "3D View"}
        </button>
      </div>
      <div className="p-10">
        <div className="p-10 relative">
          {/* Container for 3D View */}
          <div className={`absolute inset-0 ${is3DView ? "block" : "hidden"}`}>
            <ThreeDViewer />
          </div>

          {/* Container for 2D View */}
          <div className={`absolute inset-0 ${is3DView ? "hidden" : "block"}`}>
            <TwoDTopDownViewer />
          </div>
        </div>
      </div>
    </>
  );
}
