export { };

declare module '*.glb';
declare module '*.png';

declare module "@react-three/fiber" {
  import type { ThreeElement } from "@react-three/fiber";
  import type { MeshLineGeometry, MeshLineMaterial } from "meshline";

  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}
