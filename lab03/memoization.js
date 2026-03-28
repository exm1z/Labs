function memoization(fn, options = {}) {
    const {
        maxSize = Infinity,
        strategy = "LRU",
        ttl = null,
        customEvict = null
    } = options;
    const cache = new Map();

    function getKey(args) {
        return JSON.stringify(args);
    }
    function evictIfNeeded() {
        if (cache.size <= maxSize) return;
        if (strategy === "LRU") {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }

        else if (strategy === "LFU") {
            let minFreq = Infinity;
            let keyToDelete = null;

            for (let [key, value] of cache.entries()) {
                if (value.freq < minFreq) {
                    minFreq = value.freq;
                    keyToDelete = key;
                }
            }

            if (keyToDelete !== null) {
                cache.delete(keyToDelete);
            }
        }

        else if (strategy === "CUSTOM" && typeof customEvict === "function") {
            const keyToDelete = customEvict(cache);
            if (keyToDelete !== undefined) {
                cache.delete(keyToDelete);
            }
        }
    }
    return function (...args) {
        const key = getKey(args);
        const now = Date.now();

        if (cache.has(key)) {
            const entry = cache.get(key);
    
            if (ttl && now - entry.time > ttl) {
                cache.delete(key);
            } else {
                entry.freq++;
                entry.time = now;

                if (strategy === "LRU") {
                    cache.delete(key);
                    cache.set(key, entry);
                }

                return entry.value;
            }
        }
        const result = fn(...args);

        cache.set(key, {
            value: result,
            freq: 1,
            time: now
        });

        evictIfNeeded();

        return result;
    }
}
const add = (a, b) => {
    console.log("first computing");
    return a + b;
}
const memo = memoization(add);

console.log(memo(123456, 987654));
console.log(memo(123456, 987654));
console.log(memo(456, 4112));
console.log(memo(123456, 987654));
console.log(memo(456, 4112));
console.log(memo(456, 4112));