function Queue() {
  this.queue = [];
}

Queue.prototype.enqueue = function enqueue(item) {
  this.queue.push(item);
};

Queue.prototype.dequeue = function dequeue() {
  this.queue.shift();
};

Queue.prototype.length = function length() {
  return this.queue.length;
};

Queue.prototype.isEmpty = function isEmpty() {
  return this.queue.length === 0;
};

Queue.prototype.peek = function peek() {
  return this.isEmpty() ? undefined : this.queue[0];
};

export default Queue;
