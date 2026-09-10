import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import CampusScene from "./scenes/Campusscene";

function App() {
    const [activeHub, setActiveHub] = useState(null);

    return (
        <div className="app">

            <Canvas
                camera={{
                    position: [12, 10, 15],
                    fov: 45
                }}
                style={{
                    width: "100vw",
                    height: "100vh"
                }}
            >
                <CampusScene setActiveHub={setActiveHub} />
            </Canvas>

            {activeHub && (
                <div className="hub-panel">

                    <button
                        className="close-btn"
                        onClick={() => setActiveHub(null)}
                    >
                        ×
                    </button>

                    <h1>{activeHub}</h1>

                    <p>
                        Manage your {activeHub.toLowerCase()}
                    </p>

                    <div className="panel-actions">

                        <button>Add</button>

                        <button>View</button>

                        <button>Search</button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default App;