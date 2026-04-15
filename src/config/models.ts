export interface ModelConfig {
  name: string;
  path: string;
  scale: number;
}

export const MODELS: ModelConfig[] = [
  // { name: "Buster Drone", path: "/models/choza/ChozaM_E8C93442.gltf", scale: 1 },
  { name: "Choza", path: "/models/chozav4/chozav4.glb", scale: 1.2},
  { name: "Helmet",       path: "/models/roadkill/presentador.gltf",  scale: 1 },
  // { name: "Casa",         path: "/models/casa/CASA.gltf",     scale: 0.3},
];