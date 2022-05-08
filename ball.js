AFRAME.registerComponent("bowling", {
  init: function () {
    this.rollBall();
  },
  rollBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "b") {
        var ball = document.createElement("a-entity");

        ball.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
          color: "#B284BE"
      });

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        ball.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });

        ball.addEventListener("collide", this.removeBall);

        scene.appendChild(ball);
      }
    });
  },
  removeBall: function (e) {
    console.log(e.detail.target.el);

    console.log(e.detail.body.el);

    var element = e.detail.target.el;

    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("pin")) {
      elementHit.setAttribute("material", {
        opacity: 1,
        transparent: true,
      });

      var impulse = new CANNON.Vec3(-2, 2, 1);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyImpulse(impulse, worldPoint);

      element.removeEventListener("collide", this.shoot);

      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
  },
});

