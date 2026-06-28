/**
 * Each algorithm returns an array of "frames".
 * A frame = {
 *   array:      [...],      // current array values
 *   target:     number,     // the value being searched
 *   current:    number,     // index currently being checked (-1 if none)
 *   found:      number,     // index where target was found (-1 if not yet)
 *   eliminated: [i,...],    // indices ruled out (greyed)
 *   low:        number,     // binary search range low  (-1 for linear)
 *   high:       number,     // binary search range high (-1 for linear)
 *   mid:        number,     // binary search mid pointer (-1 if none)
 * }
 */

function makeFrame(arr, target, current = -1, found = -1, eliminated = [], low = -1, high = -1, mid = -1) {
  return {
    array: [...arr],
    target,
    current,
    found,
    eliminated: [...eliminated],
    low,
    high,
    mid,
  };
}

// ─── Linear Search ─────────────────────────────────────────────────────────────
export function linearSearch(inputArr, target) {
  const frames = [];
  const arr = [...inputArr];
  const eliminated = [];

  for (let i = 0; i < arr.length; i++) {
    // Checking index i
    frames.push(makeFrame(arr, target, i, -1, eliminated));

    if (arr[i] === target) {
      // Found!
      frames.push(makeFrame(arr, target, i, i, eliminated));
      return frames;
    } else {
      eliminated.push(i);
      frames.push(makeFrame(arr, target, -1, -1, eliminated));
    }
  }

  // Not found
  frames.push(makeFrame(arr, target, -1, -2, eliminated)); // found=-2 means "not found"
  return frames;
}

// ─── Binary Search ─────────────────────────────────────────────────────────────
// NOTE: Binary search requires a sorted array; the page sorts it before passing in.
export function binarySearch(inputArr, target) {
  const frames = [];
  const arr = [...inputArr].sort((a, b) => a - b); // ensure sorted
  const eliminated = [];

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // Show the current window + mid pointer
    frames.push(makeFrame(arr, target, mid, -1, eliminated, low, high, mid));

    if (arr[mid] === target) {
      frames.push(makeFrame(arr, target, mid, mid, eliminated, low, high, mid));
      return frames;
    } else if (arr[mid] < target) {
      // Eliminate left half
      for (let i = low; i <= mid; i++) eliminated.push(i);
      frames.push(makeFrame(arr, target, -1, -1, eliminated, mid + 1, high, -1));
      low = mid + 1;
    } else {
      // Eliminate right half
      for (let i = mid; i <= high; i++) eliminated.push(i);
      frames.push(makeFrame(arr, target, -1, -1, eliminated, low, mid - 1, -1));
      high = mid - 1;
    }
  }

  // Not found
  frames.push(makeFrame(arr, target, -1, -2, eliminated, -1, -1, -1));
  return frames;
}

// ─── Algorithm metadata ────────────────────────────────────────────────────────
export const SEARCH_ALGORITHMS = {
  linear: {
    name: "Linear Search",
    fn: linearSearch,
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    requiresSorted: false,
    description:
      "Sequentially checks each element of the array until the target is found or the entire array has been traversed. Simple but inefficient for large datasets.",
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;          // found at i
    }
  }
  return -1;             // not found
}`,
  },
  binary: {
    name: "Binary Search",
    fn: binarySearch,
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    requiresSorted: true,
    description:
      "Works on sorted arrays by repeatedly halving the search range. Compares the middle element to the target and discards the half that cannot contain it — extremely efficient.",
    code: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (arr[mid] === target)
      return mid;        // found
    else if (arr[mid] < target)
      low = mid + 1;     // go right
    else
      high = mid - 1;    // go left
  }
  return -1;             // not found
}`,
  },
};
