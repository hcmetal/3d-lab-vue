// import DataStore from "../DataStore";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { Tools } from "@babylonjs/core/Misc/tools";
import { Matrix } from "@babylonjs/core/Maths/math";
// import "@babylonjs/core/Meshes/meshBuilder";
import patchWechat from "./patchWechat";
import "@babylonjs/loaders/glTF/2.0";

export default class Director {
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor() {
    console.log("Director created");

    this.canvas = null;
    this.engine = null;
    this.id = null;
    this.scene = null;
    this.arcRotateCamera = null;
    this.assetsManager = null;
  }

  initialize = (canvas) => {
    this.canvas = canvas;

    const engine = new Engine(canvas, true);
    engine.setHardwareScalingLevel(1.0);
    this.engine = engine;

    const onResizeWindow = () => {
      engine.resize();
    };
    window.addEventListener("resize", onResizeWindow);
  };

  clear = () => {
    this.canvas = null;
    this.engine = null;
    this.id = null;
    this.scene = null;
    this.arcRotateCamera = null;
    this.assetsManager = null;
  };

  createScene = (id) => {
    this.id = id;

    this.scene = new Scene(this.engine);

    patchWechat(this.canvas, this.scene);

    this.createCamera();

    this.loadAssets();

    // Test objects
    // Mesh.CreateBox("testBox", 1, this.scene);
    new HemisphericLight("light1", new Vector3(0, 2, 0), this.scene);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    console.log(`SCENE ${this.id} CREATED, RENDERING STARTED`);
  };

  disposeScene = () => {
    this.engine.stopRenderLoop();

    this.scene.dispose();
    console.log(`SCENE ${this.id} DISPOSED`);
    console.log("---------------------------------------");

    this.id = null;
    this.scene = null;
    this.assetsManager = null;
    this.arcRotateCamera = null;
  };

  createCamera = () => {
    const arcRotateCamera = new ArcRotateCamera(
      "arcRotateCamera",
      Math.PI * 0.5,
      Math.PI * 0.35,
      10,
      new Vector3(0, 0, 0),
      this.scene
    );

    arcRotateCamera.fov = 0.8;
    arcRotateCamera.wheelPrecision = 8.0;
    arcRotateCamera.pinchPrecision = 8.0;
    arcRotateCamera.lowerRadiusLimit = 5;
    arcRotateCamera.upperRadiusLimit = 20;
    arcRotateCamera.lowerAlphaLimit = undefined;
    arcRotateCamera.upperAlphaLimit = undefined;
    arcRotateCamera.lowerBetaLimit = Math.PI * 0.05;
    arcRotateCamera.upperBetaLimit = Math.PI * 0.475;

    this.scene.activeCamera = arcRotateCamera;
    arcRotateCamera.attachControl(this.canvas, false);

    arcRotateCamera.useAutoRotationBehavior = true;

    this.arcRotateCamera = arcRotateCamera;
  };

  loadAssets = () => {
    const assetsManager = new AssetsManager(this.scene);
    assetsManager.useDefaultLoadingScreen = true;
    this.assetsManager = assetsManager;

    // Load mesh
    const meshTask = assetsManager.addMeshTask(
      "mesh task",
      "",
      "/assets/",
      `${this.id}.glb`
    );

    meshTask.onSuccess = () => {
      console.log("Mesh loaded");
    };

    // Load HDR
    const envTextureTask = assetsManager.addCubeTextureTask(
      "environment texture task",
      "./assets/day_02.env"
    );

    envTextureTask.onSuccess = (task) => {
      const envTexture = task.texture;
      envTexture.gammaSpace = false;

      this.scene.environmentTexture = envTexture;

      const hdrRotation = 150;
      envTexture.setReflectionTextureMatrix(
        Matrix.RotationY(Tools.ToRadians(hdrRotation))
      );

      console.log("HDR loaded");
    };

    // Load complete
    assetsManager.onFinish = () => {
      console.log("Assets loaded");

      for (let mesh of this.scene.meshes) {
        // console.log("Loaded mesh:", mesh.name);

        // Material
        this.processMaterial(mesh);
      }
    };

    assetsManager.load();
  };

  processMaterial = (mesh) => {
    if (mesh.material) {
      // scene.environmentIntensity doesn't work, set per material
      mesh.material.environmentIntensity = 0.3;

      // Emissive material
      if (mesh.name.includes("EM")) {
        mesh.material.environmentIntensity = 0;
      }

      // Transparent material
      if (mesh.name.includes("GLASS")) {
        mesh.material.transparencyMode = 2;
        mesh.material.alpha = 0.5;
      }
    }
  };
}
