/**
 *  The observer pattern is a design pattern in which you define a one-to-many relationship from one object known as the subject to many other objects known as the observers.
 *
 * The observer pattern consists of a subject that keeps track of all the observers that are currently subscribed to it. The subject also contains methods that facilitate adding, removing, and notifying these dependent objects.
 *
 */

const PubSub = {
  // key is string, which is name of the event and value is array of callback function to be executed
  list: new Map(),

  // to set up and event listener
  on(event, callback) {
    if (!this.list.has(event)) {
      // if event is not present the set new event with and empty array
      this.list.set(event, []);
    }
    // now push the event in the array of callback to be call when this event is executed
    this.list.get(event).push(callback);
    // for chaining of events
    return this;
  },
  // to close an event listener
  off(event, callback) {
    if (!this.list.has(event)) {
      return this;
    }
    if (callback) {
      // we will filter out this callback from the event cb array
      const cb = this.list.get(event).filter((cb) => cb !== callback);
      this.list.set(event, cb);
      return this;
    }

    this.list.delete(event);
    return this;
  },

  emit(event, ...args) {
    if (this.list.has(event)) {
      this.list.get(event).forEach((callback) => {
        callback(...args);
      });
    }
  },
};

PubSub.on('click', (val) => {
  console.log('Hi I am click Listener 1, called with value: ', val);
});

PubSub.on('click', (val) => {
  console.log('Hi I am click Listener 2, called with value: ', val);
});

PubSub.emit('click', 'Hi there!!');
