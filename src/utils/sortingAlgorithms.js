/**
 * Each algorithm returns an array of "frames".
 * A frame = { array: [...], comparing: [i,j], swapping: [i,j], sorted: [i,...], pivot: i }
 * Colors driven by frame state:
 *   - default   → slate blue
 *   - comparing → yellow
 *   - swapping  → red
 *   - sorted    → green
 *   - pivot     → purple
 */

function makeFrame(arr, comparing = [], swapping = [], sorted = [], pivot = null) {
  return {
    array: [...arr],
    comparing,
    swapping,
    sorted: [...sorted],
    pivot,
  };
}

// ─── Bubble Sort ───────────────────────────────────────────────────────────────
export function bubbleSort(inputArr) {
  const frames = [];
  const arr = [...inputArr];
  const n = arr.length;
  const sorted = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      frames.push(makeFrame(arr, [j, j + 1], [], sorted));

      if (arr[j] > arr[j + 1]) {
        frames.push(makeFrame(arr, [], [j, j + 1], sorted));
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        frames.push(makeFrame(arr, [], [], sorted));
      }
    }
    sorted.unshift(n - 1 - i);
    frames.push(makeFrame(arr, [], [], sorted));
  }
  sorted.unshift(0);
  frames.push(makeFrame(arr, [], [], sorted));
  return frames;
}

// ─── Selection Sort ────────────────────────────────────────────────────────────
export function selectionSort(inputArr) {
  const frames = [];
  const arr = [...inputArr];
  const n = arr.length;
  const sorted = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      frames.push(makeFrame(arr, [minIdx, j], [], sorted, minIdx));
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      frames.push(makeFrame(arr, [], [i, minIdx], sorted));
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      frames.push(makeFrame(arr, [], [], sorted));
    }
    sorted.push(i);
    frames.push(makeFrame(arr, [], [], sorted));
  }
  sorted.push(n - 1);
  frames.push(makeFrame(arr, [], [], sorted));
  return frames;
}

// ─── Insertion Sort ────────────────────────────────────────────────────────────
export function insertionSort(inputArr) {
  const frames = [];
  const arr = [...inputArr];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      frames.push(makeFrame(arr, [j - 1, j], []));
      if (arr[j] < arr[j - 1]) {
        frames.push(makeFrame(arr, [], [j - 1, j]));
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        frames.push(makeFrame(arr, [], []));
        j--;
      } else {
        break;
      }
    }
  }
  const sorted = Array.from({ length: n }, (_, i) => i);
  frames.push(makeFrame(arr, [], [], sorted));
  return frames;
}

// ─── Merge Sort ────────────────────────────────────────────────────────────────
export function mergeSort(inputArr) {
  const frames = [];
  const arr = [...inputArr];

  function merge(arr, l, m, r) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      frames.push(makeFrame(arr, [l + i, m + 1 + j]));
      if (left[i] <= right[j]) {
        arr[k] = left[i++];
      } else {
        arr[k] = right[j++];
      }
      frames.push(makeFrame(arr, [], [k]));
      k++;
    }
    while (i < left.length) { arr[k++] = left[i++]; frames.push(makeFrame(arr)); }
    while (j < right.length) { arr[k++] = right[j++]; frames.push(makeFrame(arr)); }
  }

  function sort(arr, l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    sort(arr, l, m);
    sort(arr, m + 1, r);
    merge(arr, l, m, r);
  }

  sort(arr, 0, arr.length - 1);
  const sorted = Array.from({ length: arr.length }, (_, i) => i);
  frames.push(makeFrame(arr, [], [], sorted));
  return frames;
}

// ─── Quick Sort ────────────────────────────────────────────────────────────────
export function quickSort(inputArr) {
  const frames = [];
  const arr = [...inputArr];

  function partition(arr, low, high) {
    const pivotVal = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      frames.push(makeFrame(arr, [j, high], [], [], high));
      if (arr[j] <= pivotVal) {
        i++;
        frames.push(makeFrame(arr, [], [i, j], [], high));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        frames.push(makeFrame(arr, [], [], [], high));
      }
    }
    frames.push(makeFrame(arr, [], [i + 1, high], [], high));
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    frames.push(makeFrame(arr, [], [], [], i + 1));
    return i + 1;
  }

  function sort(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);
      sort(arr, low, pi - 1);
      sort(arr, pi + 1, high);
    }
  }

  sort(arr, 0, arr.length - 1);
  const sorted = Array.from({ length: arr.length }, (_, i) => i);
  frames.push(makeFrame(arr, [], [], sorted));
  return frames;
}

// ─── Algorithm metadata ────────────────────────────────────────────────────────
export const ALGORITHMS = {
  bubble: {
    name: "Bubble Sort",
    fn: bubbleSort,
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    description:
      "Repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. The pass through the list is repeated until sorted.",
    code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`,
  },
  selection: {
    name: "Selection Sort",
    fn: selectionSort,
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: false,
    description:
      "Divides the array into sorted and unsorted parts. Repeatedly selects the minimum element from the unsorted part and places it at the end of the sorted part.",
    code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
  },
  insertion: {
    name: "Insertion Sort",
    fn: insertionSort,
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    description:
      "Builds the sorted array one item at a time by inserting each element into its correct position relative to the already-sorted portion.",
    code: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j-1]) {
      // swap adjacent elements
      [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
      j--;
    }
  }
  return arr;
}`,
  },
  merge: {
    name: "Merge Sort",
    fn: mergeSort,
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stable: true,
    description:
      "Divides the array into halves, recursively sorts each half, then merges them back together. Guarantees O(n log n) in all cases.",
    code: `function mergeSort(arr, l, r) {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}
function merge(arr, l, m, r) {
  // compare and place elements
  while (i < left.len && j < right.len) {
    if (left[i] <= right[j])
      arr[k++] = left[i++];
    else arr[k++] = right[j++];
  }
}`,
  },
  quick: {
    name: "Quick Sort",
    fn: quickSort,
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    stable: false,
    description:
      "Picks a pivot element and partitions the array so elements less than pivot come before it and greater elements after. Recursively sorts sub-arrays.",
    code: `function quickSort(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
  return i + 1;
}`,
  },
};
