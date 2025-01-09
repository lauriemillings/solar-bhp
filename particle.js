class Particle {
    constructor(x, y) {
      this.pos = createVector(x, y);
      // gives particles random velocities so that we can see them move in different directions otherwise they'd layer
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(0.5, 2));
      this.acc = createVector(0, 0);
      // controls how big the texture is and makes the particles fuzzier
      this.r = 64;
      // gives the particles a full opacity so that they can fade away during their lifetime
      this.lifetime = 255;
    }
  
    // returns true if the particles lifetime is 0
    finished() {
      return this.lifetime < 0;
    }
  
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
  
      // the speed of the particles fading away. if it's a smaller number, the lifetime will be longer and the orb has a longer trail
      this.lifetime -= 7;
    }
  
    show() {
      // every rgb value needs a number higher than 0 to have a white glow, using blendMode(ADD) adds the colours to create a hot white
      // the objects alpha is the lifetime variable which counts down the particles to fade them away
      tint(255, 89, 30, this.lifetime);
      // so that the centre of the image is at the location of the particle
      imageMode(CENTER);
      // drawing the texture image which is 100px by 100px
      image(img, innerWidth/2, innerHeight/2, 100, 100);
    }
  }