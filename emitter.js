// the emitter is the object that keeps track of all the particles
class Emitter {
    constructor(x, y) {
      // the position where the particles will be emitted from
      this.position = createVector(x, y);
      // an array of particles
      this.particles = [];
    }
  
    // the num argument represents the number of particles to be emitted
    emit(num) {
      for (let i = 0; i < num; i++) {
        // the particles to be emitted at the position of the emitter rather than giving it absolute position
        // push() function allows you to add something at the end of an array that you’ve already declared e.g. add new particles
        this.particles.push(new Particle(this.position.x, this.position.y));
      }
    }
  
    // need to add this. as this is a particles property of the emitter class
    update() {
      for (let particle of this.particles) {
        particle.update();
      }
  
      // loops through the array backwards, starting at the end to check if every particle is finished
      for (let i = this.particles.length - 1; i >= 0; i--) {
        if (this.particles[i].finished()) {
          // when particles fade away they aren't erased which causes the programme to run slower. splice is needed to delete the invisible particles for framerate consistency
           // for the splice() function, the first argument is the index (the number in the array), the second argument is how many to be deleted
          this.particles.splice(i, 1);
        }
      }
    }
  
    show() {
      for (let particle of this.particles) {
        particle.show();
      }
    }
  }