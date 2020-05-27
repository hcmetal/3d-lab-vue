import { Tools } from "@babylonjs/core";

export default function patchWechat(canvas, scene) {
  // Fix pointer interaction in Wechat
  let ua = window.navigator.userAgent.toLowerCase();
  // console.log(ua);

  if (ua.includes("micromessenger")) {
    // console.log("touch interaction patched for micromessenger");
    const n = scene._onPointerUp,
      o = scene._onPointerDown,
      r = scene._onPointerMove,
      a = Tools.GetPointerPrefix();

    canvas.removeEventListener(a + "move", r);
    canvas.removeEventListener(a + "down", o);
    window.removeEventListener(a + "up", n);

    scene._onPointerUp = function(e) {
      void 0 !== e.pointerId && n(e);
    };
    scene._onPointerDown = function(e) {
      void 0 !== e.pointerId && o(e);
    };
    scene._onPointerMove = function(e) {
      void 0 !== e.pointerId && r(e);
    };

    canvas.addEventListener(a + "move", scene._onPointerMove, !1);
    canvas.addEventListener(a + "down", scene._onPointerDown, !1);
    window.addEventListener(a + "up", scene._onPointerUp, !1);
  }
}
