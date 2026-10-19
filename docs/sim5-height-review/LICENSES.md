# Assets and authorship

No original GLB was modified and no new third-party download was introduced.

- **Factory**: `SERNEM_SIM4_Factory_optimized.glb`, existing repository attribution: Pepe Orejel / CC BY 4.0. The optimized file contains a trimesh generator record but no embedded source URL. This package preserves the existing attribution; it does not invent a provenance URL.
- **Large Industrial Storage Tanks**: [Duane’s Mind](https://sketchfab.com/duanesmind), [source model](https://sketchfab.com/3d-models/large-industrial-storage-tanks-bd3ac97071104b64bc388a155b64f79e), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). This is the author and license embedded in the actual GLB. The previous UI attribution “burnedhrum” was inconsistent with that record and is corrected.
- **009 Male Worker Welder 06**: grewe.juergen, [source model](https://sketchfab.com/3d-models/009-male-worker-welder-06-d91b45d3009440319f0b62f86ed3c249), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The approved welding assembly remains unchanged. A second role reuses only the detailed human/PPE meshes from the same already loaded source, with a fitted vest, radio and separate standing transform. It does not copy the welding kit or load another GLB. Material textures remain shared. This existing licensed human asset was selected over an additional large character download.
- Access seam plates, service-bridge deck/edge protection, fittings tray, spanner, fitted vest and fire-watch station: original procedural geometry in this repository, covered by the repository license.

Facility source hashes and node/material records are in `source-geometry.json`; the existing [welder inspection](../sim5-welding-review/asset-inspection.json) records the human source; authoritative post-loader world transforms and bounds are in `runtime-geometry.json`. No attribution or license is removed from an original asset.
