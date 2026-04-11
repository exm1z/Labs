function queue() {
  const items = []

  return {
    enqueue(value, priority) {
      items.push({ value, priority });
    },

    peek(type) {
      if (items.length === 0) return null;
      if (type === "highest") {
        return items.reduce((max, item) =>
          item.priority > max.priority ? item : max
        ).value;
      }
      if (type === "lowest") {
        return items.reduce((min, item) =>
          item.priority < min.priority ? item : min
        ).value;
      }
      if (type === "oldest") return items[0].value;
      if (type === "newest") return items[items.length - 1].value;
    },

    dequeue(type) {
      if (items.length === 0) return null;
      let index = 0;

      if (type === "highest") {
        index = items.reduce((maxIdx, item, i, arr) =>
          item.priority > arr[maxIdx].priority ? i : maxIdx
        , 0)
      }
      if (type === "lowest") {
        index = items.reduce((minIdx, item, i, arr) =>
          item.priority < arr[minIdx].priority ? i : minIdx
        , 0)
      }
      if (type === "oldest") index = 0;
      if (type === "newest") index = items.length - 1;

      return items.splice(index, 1)[0].value;
    }
  }
}
const q = queue();

q.enqueue("A", 124);
q.enqueue("B", 104);
q.enqueue("C", 11);

console.log(q.peek("highest"));
console.log(q.peek("lowest"));
console.log(q.peek("oldest"));
console.log(q.peek("newest"));

console.log(q.dequeue("highest"));
console.log(q.dequeue("oldest"));