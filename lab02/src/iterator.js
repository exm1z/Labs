function generatorIterator() {
function* generator(min = 0, max = 100) {
    while (true) {
        yield Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
function iterator(iterator, timeoutSeconds) {
    const endTime = Date.now() + timeoutSeconds * 1000;
    let count = 0;
    let sum = 0;
    function process() {
        if (Date.now() >= endTime) {
            console.log("Sum:", sum);
            return;
        }
        const { value } = iterator.next();
        count++;
        sum += value;
        console.log(value);
        setTimeout(process, 100);
    }
    process();
}
const random = generator(1, 10000);
iterator(random, 4);
}
module.exports = {generatorIterator}