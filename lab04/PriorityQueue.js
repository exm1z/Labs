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