import * as Cesium from "cesium"

window.addEventListener("DOMContentLoaded", () => {
  var viewer = new Cesium.Viewer("cesiumContainer")
  viewer.scene.primitives.add(Cesium.createOsmBuildings())
})
