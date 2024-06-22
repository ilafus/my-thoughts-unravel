class Pearl {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    //push();
    // Turn on an ambient light.
    ambientLight(400);

    let c = color(100, 255, 255); //100 255 255
    let lightDir = createVector(0, 1, 0);
    directionalLight(c, lightDir);
    shininess(5);

    // Turn on a white point light that follows the mouse.
    pointLight(255, 255, 150, 100, 350, 300);

    // Style the spheres.
    noStroke();
    fill(255, 200, 255);

    specularMaterial(250);

    // Draw the left sphere with low metalness.
    push();
    translate(this.x + sin(angle + HALF_PI) * 10, this.y + 100);
    metalness(80);
    sphere(20); //sfera 1
    // pop();

    push();
    // Draw the right sphere with high metalness.
    translate(this.x, this.y, -50);
    metalness(100);
    sphere(20); //sfera 2
    pop();

    push();
    translate(-this.x + sin(HALF_PI) * 10, this.y + 100, 40);
    metalness(100);
    sphere(20); //sfera 3
    pop();

    push();
    translate(this.x + 300 + sin(angle + HALF_PI) * 10, this.y, -7);
    metalness(100);
    sphere(20); //sfera 4
    pop();

    push();
    translate(-this.x - 300, this.y - 180, -10);
    sphere(20); //sfera 5
    pop();

    push();
    translate(-this.x - 140 + sin(angle + HALF_PI), this.y + 180, -4);
    sphere(20); //sfera 6
    pop();

    push();
    translate(this.x + 140 + sin(angle + HALF_PI) * 10, this.y, 8);
    sphere(20); //sfera 7
    pop();

    push();
    translate(-this.x - 200, -this.y - 300);
    sphere(20); //sfera 7
    pop();

    push();
    translate(-this.x - 500, -this.y - 400, -10);
    sphere(20); //sfera 8
    pop();

    push();
    translate(-this.x - 200 + sin(angle + HALF_PI), this.y - 400, -200);
    sphere(20); //sfera 9
    pop();

    push();
    translate(-this.x + 150 + sin(angle), this.y, -200);
    sphere(20); //sfera 10
    pop();

    push();
    translate(-this.x + 400 + sin(HALF_PI), this.y - 500, 100);
    sphere(20); //sfera 11
    pop();

    push();
    translate(this.x + 500 + sin(angle), this.y + 300, -200);
    sphere(20); //sfera 12
    pop();

    push();
    translate(this.x + 400, this.y + 90, 20);
    sphere(20); //sfera 13
    pop();

    push();
    translate(this.x + 15 + sin(angle), this.y, 40);
    sphere(20); //sfera 14
    pop();

    push();
    translate(this.x * 15, this.y * -109, 400);
    sphere(20); //sfera 14
    pop();

    //pop();
  }
}
