export interface ModelConfig {
  name: string;
  path: string;
  scale: number;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const MODELS: ModelConfig[] = [
  // { name: "Buster Drone", path: "/models/test_house_2/model.gltf", scale: 0.01, position: [7,0,10], rotation: [-Math.PI/2, 0, 0]  },
  {name: "House", path: "/models/test_house/model_compressed.glb", scale: 0.01, position: [7,0,10], rotation: [-Math.PI/2, 0, 0]},
  { name: "Choza", path: "/models/chozav4/chozav4.glb", scale: 1.4, position: [5, 1, 10], rotation: [0, Math.PI/10, 0] },
  { name: "Helmet", path: "/models/roadkill/presentador.gltf", scale: 1, position: [0, -0.5, 0], rotation: [0, 0, 0] },
  // { name: "Casa",         path: "/models/casa/CASA.gltf",     scale: 0.3},
];