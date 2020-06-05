

class EventManager {
  events = {};

  subscribe(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    const event = { key: Date.now(), callback };
    this.events[name].push(event);
    return event.key;
  }

  publish(name, data) {
    if (this.events[name]) {
      this.events[name].forEach(({ callback }) => {
        callback(data);
      });
    }
  }

  unSubscribe(name, key) {
    if (this.events[name]) {
      for (let i = 0; i < this.events[name].length; i++) {
        if (key === this.events[name][i].key) {
          this.events[name].splice(i, 1);
          break;
        }
      }
    }
  }
}

const eventManager = new EventManager();

export default eventManager;
