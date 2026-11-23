/**
 * @param {number[][]} events
 * @return {number}
 */
var maxEvents = function(events) {
    events.sort((a, b) => a[0] - b[0]);
    
    let maxDay = 0;
    for (const [start, end] of events) {
        maxDay = Math.max(maxDay, end);
    }

    const heap = [];
    
    const push = (val) => {
        heap.push(val);
        let i = heap.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (heap[p] <= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            while (true) {
                let l = 2 * i + 1;
                let r = 2 * i + 2;
                let smallest = i;
                if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
                if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
                if (smallest === i) break;
                [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
                i = smallest;
            }
        }
        return top;
    };
    
    const peek = () => heap[0];
    
    let count = 0;
    let i = 0;
    
    for (let d = 1; d <= maxDay; d++) {
        while (i < events.length && events[i][0] <= d) {
            push(events[i][1]);
            i++;
        }
        
        while (heap.length > 0 && peek() < d) {
            pop();
        }
        
        if (heap.length > 0) {
            pop();
            count++;
        }
    }
    
    return count;
};

// Synced seamlessly with LeetHub Pro
// Pro features: https://bit.ly/leethubpro | Free version: https://bit.ly/leethubv4
// Get it here: https://chromewebstore.google.com/detail/bcilpkkbokcopmabingnndookdogmbna