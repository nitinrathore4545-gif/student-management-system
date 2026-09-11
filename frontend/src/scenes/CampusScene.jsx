import { OrbitControls ,Text} from "@react-three/drei";
import { useState,useRef } from "react";
import { useThree,useFrame } from "@react-three/fiber";



function Ground(){
    return(
        <mesh  receiveShadow rotation={[-Math.PI / 2,0,0]}>
            <planeGeometry args={[40,40]} />
            <meshStandardMaterial color="#171d24" roughness={0.8}/>
        </mesh>
    )
}
function Path({ position, rotation = [0, 0, 0], size }) {
    return (
        <mesh
            position={position}
            rotation={rotation}
        >
            <boxGeometry args={size} />
            <meshStandardMaterial
                color="#303943"
                roughness={0.9}
            />
        </mesh>
    );
}
function AmbientParticles() {
    const particlesRef = useRef();

    useFrame((state) => {
        if (!particlesRef.current) return;

        particlesRef.current.rotation.y =
            state.clock.elapsedTime * 0.015;

        particlesRef.current.position.y =
            Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    });

    const positions = [];

    for (let i = 0; i < 120; i++) {
        positions.push(
            (Math.random() - 0.5) * 35,
            Math.random() * 8 + 0.5,
            (Math.random() - 0.5) * 30
        );
    }

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={new Float32Array(positions)}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                size={0.035}
                color="#94a3b8"
                transparent
                opacity={0.45}
            />
        </points>
    );
}
function SelectionRing({ active, color }) {
    const ringRef = useRef();

    useFrame((state) => {
        if (!ringRef.current || !active) return;

        ringRef.current.rotation.z =
            state.clock.elapsedTime * 0.5;

        const pulse =
            1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.035;

        ringRef.current.scale.set(pulse, pulse, pulse);
    });

    if (!active) return null;

    return (
        <mesh
            ref={ringRef}
            position={[0, -1.38, 0]}
            rotation={[Math.PI / 2, 0, 0]}
        >
            <torusGeometry args={[3.7, 0.055, 12, 96]} />

            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
}

function Studenthub({setActiveHub,activeHub}) {
    const [hovered,sethovered] = useState(false)
    return (
        <group
    position={[0, 1.5, -5]}
    scale={hovered || activeHub === "Student Hub" ? 1.08 : 1}
>
            <Text
            position={[0,2.5,2.2]}
            fontSize={0.6}
            color="white"
            anchorX="center"
            anchorY="middle"
            >
                STUDENT HUB
            </Text>
            {/* main building */}
            <mesh
              castShadow
    receiveShadow
            onPointerEnter={()=> sethovered(true)}
            onPointerLeave={()=> sethovered(false)}
            onClick={()=> setActiveHub("Student Hub")}
            >
                <boxGeometry args={[5,3,4]} />
               <meshStandardMaterial
    color={
        hovered || activeHub === "Student Hub"
            ? "#46515c"
            : "#252b32"
    }
    emissive={
        activeHub === "Student Hub"
            ? "#3b82f6"
            : "#000000"
    }
    emissiveIntensity={
        activeHub === "Student Hub" ? 0.35 : 0
    }
/>
            </mesh>
           <SelectionRing
    active={activeHub === "Student Hub"}
    color="#3b82f6"
/>
            {/* roof */}
            <mesh position={[0,1.8,0]}>
           <boxGeometry args={[5.4,0.4,4.4]}/>
           <meshStandardMaterial color="#0d1115"/>
            </mesh>
            {/* entrance */}
            <mesh position={[0,-0.3,2.05]}>
            <boxGeometry args={[1.5,2,0.15]} />
            <meshStandardMaterial color="#151b21" />
            </mesh>
            {/* left window */}
            <mesh position={[-1.5,0.3,2.05]} >
                <boxGeometry args={[1,1,0.12]}/>
               <meshStandardMaterial
    color="#3b82f6"
    emissive="#3b82f6"
    emissiveIntensity={1.5}
/>
            </mesh>
            {/* right window */}
            <mesh position={[1.5,0.3,2.05]}
            >
                <boxGeometry args={[1,1,0.12]} />
             <meshStandardMaterial
    color="#3b82f6"
    emissive="#3b82f6"
    emissiveIntensity={1.5}
/>
            </mesh>

        </group>
    )
}

function CourseHub({setActiveHub,activeHub}) {
    const [hovered,setHovered] = useState(false)
    return (
        <group position={[-6, 1.5, 4]} scale={hovered || activeHub === "Course Hub" ? 1.08 : 1}
        >
            <Text
    position={[0, 2.4, 2.2]}
    fontSize={0.55}
    color="white"
    anchorX="center"
    anchorY="middle"
>
    COURSE HUB
</Text>

            <mesh
              castShadow
    receiveShadow
            onPointerEnter={()=> setHovered(true)}
            onPointerLeave={()=> setHovered(false)}
            onClick={()=> setActiveHub("Course Hub")}
            >
                <boxGeometry args={[5, 3, 4]} />
              <meshStandardMaterial   color={
    hovered || activeHub === "Course Hub"
        ? "#46515c"
        : "#39434d"
}
emissive={
    activeHub === "Course Hub"
        ? "#22c55e"
        : "#000000"
}
emissiveIntensity={
    activeHub === "Course Hub" ? 0.35 : 0
}/>
            </mesh>
          <SelectionRing
    active={activeHub === "Course Hub"}
    color="#22c55e"
/>

            <mesh position={[0, 1.8, 0]}>
                <boxGeometry args={[5.4, 0.4, 4.4]} />
                <meshStandardMaterial color="#151a20" />
            </mesh>

            <mesh position={[0, -0.3, 2.05]}>
                <boxGeometry args={[1.5, 2, 0.15]} />
                <meshStandardMaterial color="#111820" />
            </mesh>

            <mesh position={[-1.5, 0.3, 2.05]}>
                <boxGeometry args={[1, 1, 0.12]} />
                <meshStandardMaterial
                    color="#22c55e"
                    emissive="#22c55e"
                    emissiveIntensity={1.5}
                />
            </mesh>

            <mesh position={[1.5, 0.3, 2.05]}>
                <boxGeometry args={[1, 1, 0.12]} />
                <meshStandardMaterial
                    color="#22c55e"
                    emissive="#22c55e"
                    emissiveIntensity={1.5}
                />
            </mesh>

        </group>
    );
}


function ResultHub({setActiveHub,activeHub}) {
    const [hovered,sethovered] = useState(false)
    return (
        <group position={[6, 1.5, 4]} scale={hovered || activeHub === "Result Hub" ? 1.08 : 1}>
            <Text
    position={[0, 2.4, 2.2]}
    fontSize={0.55}
    color="white"
    anchorX="center"
    anchorY="middle"
>
    RESULT HUB
</Text>

            <mesh
              castShadow
    receiveShadow
            onPointerEnter={()=> sethovered(true)}
            onPointerLeave={()=> sethovered(false)}
            onClick={()=> setActiveHub("Result Hub")}
            >
                <boxGeometry args={[5, 3, 4]} />
                <meshStandardMaterial  color={
    hovered || activeHub === "Result Hub"
        ? "#46515c"
        : "#39434d"
}
emissive={
    activeHub === "Result Hub"
        ? "#f59e0b"
        : "#000000"
}
emissiveIntensity={
    activeHub === "Result Hub" ? 0.35 : 0
} />
            </mesh>
          <SelectionRing
    active={activeHub === "Result Hub"}
    color="#f59e0b"
/>
            <mesh position={[0, 1.8, 0]}>
                <boxGeometry args={[5.4, 0.4, 4.4]} />
                <meshStandardMaterial color="#151a20" />
            </mesh>

            <mesh position={[0, -0.3, 2.05]}>
                <boxGeometry args={[1.5, 2, 0.15]} />
                <meshStandardMaterial color="#111820" />
            </mesh>

            <mesh position={[-1.5, 0.3, 2.05]}>
                <boxGeometry args={[1, 1, 0.12]} />
                <meshStandardMaterial
                    color="#f59e0b"
                    emissive="#f59e0b"
                    emissiveIntensity={1.5}
                />
            </mesh>

            <mesh position={[1.5, 0.3, 2.05]}>
                <boxGeometry args={[1, 1, 0.12]} />
                <meshStandardMaterial
                    color="#f59e0b"
                    emissive="#f59e0b"
                    emissiveIntensity={1.5}
                />
            </mesh>

        </group>
    );
}
function CameraController({ activeHub }) {
    const { camera } = useThree();
    const controlsRef = useRef();

    const views = {
        default: {
            position: [12, 10, 15],
            target: [0, 0, 0]
        },

        "Student Hub": {
            position: [0, 7, 7],
            target: [0, 1, -5]
        },

        "Course Hub": {
            position: [-11, 7, 13],
            target: [-6, 1, 4]
        },

        "Result Hub": {
            position: [11, 7, 13],
            target: [6, 1, 4]
        }
    };

    useFrame(() => {
        const view = views[activeHub] || views.default;

        camera.position.x +=
            (view.position[0] - camera.position.x) * 0.04;

        camera.position.y +=
            (view.position[1] - camera.position.y) * 0.04;

        camera.position.z +=
            (view.position[2] - camera.position.z) * 0.04;

        if (controlsRef.current) {
            controlsRef.current.target.x +=
                (view.target[0] - controlsRef.current.target.x) * 0.04;

            controlsRef.current.target.y +=
                (view.target[1] - controlsRef.current.target.y) * 0.04;

            controlsRef.current.target.z +=
                (view.target[2] - controlsRef.current.target.z) * 0.04;

            controlsRef.current.update();
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.08}
        />
    );
}

function CampusScene ({setActiveHub,activeHub}){
    return (
        <>
        <color  attach="background" args={["#080b0f"]}/>
       <ambientLight intensity={0.7} />

<directionalLight
    position={[8, 12, 6]}
    intensity={2.2}
    castShadow
/>

<pointLight
    position={[-6, 5, 2]}
    intensity={5}
    distance={20}
/>

<pointLight
    position={[6, 4, 4]}
    intensity={3}
    distance={18}
/>
        <Ground/>
        <AmbientParticles/>
        {/* Main vertical path */}
<Path
    position={[0, 0.03, 0]}
    size={[2, 0.08, 18]}
/>

{/* Horizontal path */}
<Path
    position={[0, 0.04, 4]}
    size={[16, 0.08, 2]}
/>

        <Studenthub setActiveHub={setActiveHub} activeHub={activeHub}/>
        <CourseHub setActiveHub={setActiveHub} activeHub={activeHub}/>
        <ResultHub setActiveHub={setActiveHub} activeHub={activeHub}/>
       <CameraController activeHub={activeHub} />
        </>
    )
}

export default CampusScene