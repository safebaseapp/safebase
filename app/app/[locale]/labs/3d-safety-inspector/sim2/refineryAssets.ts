/** SIM 3.0 authored 3D asset registry.
 * Only real, repository-hosted GLB assets belong here.
 * Missing equipment must not silently be replaced by toy-like procedural props.
 * All dimensions are in scene metres and placement is explicit.
 */
export type RefineryAssetId = "welding-cart" | "storage-tanks" | "mobile-crane" | "lifting-sling" | "mobile-crane";
export type RefineryAsset = {
  id: RefineryAssetId;
  src: string;
  attribution: string;
  licence: string;
  heightMetres?: number;
  position?: readonly [number, number, number];
};
export const REFINERY_ASSETS: readonly RefineryAsset[] = [
  {
    id: "welding-cart",
    src: "/models/refinery/portable_welding_cart_1k.glb",
    attribution: "Poly Haven – Portable Welding Cart",
    licence: "CC0",
    heightMetres: 3.12,
  },
  {
    id: "mobile-crane",
    src: "/models/refinery/mobile-crane.glb",
    attribution: "Innerscene – Mobile Crane (user-supplied GLB)",
    licence: "CC0 (verify provenance before production)",
    position: [20, 0, 27],
  },
  {
    id: "mobile-crane",
    src: "/models/refinery/mobile-crane.glb",
    attribution: "User-supplied mobile crane model; verify original author and licence before public release",
    licence: "Unverified",
    heightMetres: 7,
  },
  {
    id: "lifting-sling",
    src: "/models/refinery/endless-webbing-lifting-sling.glb",
    attribution: "User-supplied CAD lifting sling converted to GLB",
    licence: "Unverified",
    heightMetres: 1.25,
  },
  {
    id: "storage-tanks",
    src: "/models/refinery/large_industrial_storage_tanks.glb",
    attribution: "Duane’s Mind / Sketchfab",
    licence: "CC BY",
    position: [28, 0, -5],
  },
] as const;
export const refineryAsset = (id: RefineryAssetId): RefineryAsset => {
  const asset = REFINERY_ASSETS.find(item => item.id === id);
  if (!asset) throw new Error("Unknown refinery asset: " + id);
  return asset;
};
