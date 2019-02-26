const { EventEmitter } = require('events');

class Lock {
    
  constructor() {
    this.locked = false;
    this.emitter = new EventEmitter();
  }

  acquire() {
    return new Promise(resolve => {
      // If nobody has the lock, take it and resolve immediately
      if (!this.locked) {
        this.locked = true;
        return resolve();
      }

      // Otherwise, wait until somebody releases the lock and try again
      const tryAcquire = () => {
        if (!this.locked) {
          this.locked = true;
          this.emitter.removeListener('release', tryAcquire);
          return resolve();
        }
      };
      this.emitter.on('release', tryAcquire);
    });
  }

  release() {
    // Release the lock immediately
    this.locked = false;
    setImmediate(() => this.emitter.emit('release'));
  }
}

module.exports = {Lock}