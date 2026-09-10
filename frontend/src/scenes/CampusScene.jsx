import { OrbitControls ,Text} from "@react-three/drei";
import { useState } from "react";



function Ground(){
    return(
        <mesh rotation={[-Math.PI / 2,0,0]}>
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

function Studenthub({setActiveHub}) {
    const [hovered,sethovered] = useState(false)
    return (
        <group position={[0, 1.5, -5]} scale={hovered ? 1.08:1}>
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
            onPointerEnter={()=> sethovered(true)}
            onPointerLeave={()=> sethovered(false)}
            onClick={()=> setActiveHub("Student Hub")}
            >
                <boxGeometry args={[5,3,4]} />
                <meshStandardMaterial color={hovered ? "#3b4652":"#252b32"} roughness={0.7}/>
            </mesh>
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

function CourseHub({setActiveHub}) {
    const [hovered,setHovered] = useState(false)
    return (
        <group position={[-6, 1.5, 4]} scale={hovered ? 1.08 : 1}>
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
            onPointerEnter={()=> setHovered(true)}
            onPointerLeave={()=> setHovered(false)}
            onClick={()=> setActiveHub("Course Hub")}
            >
                <boxGeometry args={[5, 3, 4]} />
                <meshStandardMaterial color={hovered?"#46515c" : "#39434d"} />
            </mesh>

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

function ResultHub({setActiveHub}) {
    const [hovered,sethovered] = useState(false)
    return (
        <group position={[6, 1.5, 4]} scale={hovered? 1.08: 1}>
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
            onPointerEnter={()=> sethovered(true)}
            onPointerLeave={()=> sethovered(false)}
            onClick={()=> setActiveHub("Result Hub")}
            >
                <boxGeometry args={[5, 3, 4]} />
                <meshStandardMaterial   color={hovered ? "#46515c" : "#39434d"} />
            </mesh>

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

function CampusScene ({setActiveHub}){
    return (
        <>
        <color  attach="background" args={["#080b0f"]}/>
        <ambientLight intensity={2} />
        <directionalLight position={[5,10,5]} intensity={3} />
        <pointLight position={[-6,5,2]} intensity={10} distance={20} />
        <Ground/>
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

        <Studenthub setActiveHub={setActiveHub}/>
        <CourseHub setActiveHub={setActiveHub}/>
        <ResultHub setActiveHub={setActiveHub}/>
        <OrbitControls/>
        </>
    )
}

export default CampusScene