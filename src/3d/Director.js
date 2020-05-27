import DataStore from "../DataStore";
import {
  Vector3,
  Mesh,
  ArcRotateCamera,
  Scene,
  HemisphericLight,
} from "@babylonjs/core";
import "@babylonjs/core/Meshes/meshBuilder";

export default class Director {
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor() {
    console.log("Director created");

    this.dataStore = DataStore.getInstance();
    this.id = null;
    this.scene = null;
    this.canvas = null;
    // this.assetsManager = null;
    this.arcRotateCamera = null;
    // this.cameraFocusAnimation = {};
  }

  initialize = () => {
    this.engine = this.dataStore.get("engine");
    this.canvas = this.dataStore.get("canvas");
  };

  clear = () => {
    this.dataStore = null;
    this.canvas = null;
    this.id = null;
    this.scene = null;
    // this.assetsManager = null;
    this.arcRotateCamera = null;
    // this.cameraFocusAnimation = {};
  };

  createScene = () => {
    // this.id = id;

    this.scene = new Scene(this.engine);

    // patchWechat(this.canvas, this.scene);

    this.createCamera();
    // this.loadAssets();

    // Test objects
    Mesh.CreateBox("testBox", 1, this.scene);
    new HemisphericLight("light1", new Vector3(0, 2, 0), this.scene);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    // if (id !== "school") {
    //   this.dataStore.get("setPortalTarget")(id);
    // }

    console.log(`SCENE CREATED, RENDERING STARTED`);
  };

  createCamera = () => {
    const arcRotateCamera = new ArcRotateCamera(
      "arcRotateCamera",
      Math.PI * -0.35,
      Math.PI * 0.25,
      5,
      new Vector3(0, 0, 0),
      this.scene
    );

    arcRotateCamera.fov = 0.9;
    arcRotateCamera.wheelPrecision = 8.0;
    arcRotateCamera.pinchPrecision = 8.0;
    arcRotateCamera.lowerRadiusLimit = 2;
    arcRotateCamera.upperRadiusLimit = 10;
    arcRotateCamera.lowerAlphaLimit = undefined;
    arcRotateCamera.upperAlphaLimit = undefined;
    arcRotateCamera.lowerBetaLimit = Math.PI * 0.05;
    arcRotateCamera.upperBetaLimit = Math.PI * 0.475;

    this.scene.activeCamera = arcRotateCamera;
    arcRotateCamera.attachControl(this.canvas, false);

    arcRotateCamera.useAutoRotationBehavior = true;

    this.arcRotateCamera = arcRotateCamera;
  };
}
