export interface ModelConfig {
  name: string;
  path: string;
  scale: number;
}

export const MODELS: ModelConfig[] = [
  // { name: "Buster Drone", path: "/models/choza/ChozaM_E8C93442.gltf", scale: 1 },
  { name: "Choza", path: "/models/chozav2/Allinone.gltf", scale: 1.2},
  // { name: "Helmet",       path: "/models/helmet/scene1.gltf",  scale: 0.02 },
  // { name: "Casa",         path: "/models/casa/CASA.gltf",     scale: 0.3},
];