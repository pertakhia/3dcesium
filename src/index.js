import * as Cesium from "cesium/Cesium"
import "cesium/Widgets/widgets.css"

window.addEventListener("DOMContentLoaded", () => {
  var viewer = new Cesium.Viewer("cesiumContainer")
  viewer.scene.primitives.add(Cesium.createOsmBuildings())
})
