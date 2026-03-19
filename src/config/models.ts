export interface ModelConfig {
  name: string;
  path: string;
  scale: number;
}

export const MODELS: ModelConfig[] = [
  { name: "Buster Drone", path: "/models/drone/scene.gltf",         scale: 1.5  },
  { name: "Helmet",       path: "/models/helmet/scene1.gltf",  scale: 0.02 },
  { name: "Casa",         path: "/models/casa/CASA.gltf",     scale: 0.3},
];