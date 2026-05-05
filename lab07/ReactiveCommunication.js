const EventEmitter = require('events');
class MessageBus extends EventEmitter {}

class User {
    constructor(name, bus) {
        this.name = name;
        this.bus = bus;
        this.listener = (msg) => {
            console.log(`${this.name} received: ${msg}`);
        };
    }
    subscribe() {
        this.bus.on('message', this.listener);
    }
    unsubscribe() {
        this.bus.off('message', this.listener);
    }

    sendMessage(msg) {
        this.bus.emit('message', `${this.name}: ${msg}`);
    }
}

const bus = new MessageBus();
const userA = new User("Alice", bus);
const userB = new User("Bob", bus);
const userC = new User("Charlie", bus);

userA.subscribe();
userB.subscribe();
userC.subscribe();

console.log("\nFirst message:");
userA.sendMessage("Hello everyone!");

userB.unsubscribe();

console.log("\nSecond message:");
userC.sendMessage("Only some will receive this");