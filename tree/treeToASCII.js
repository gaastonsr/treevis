// Taken from https://stackoverflow.com/a/801794/1781670
// Ported to JS by Gaston Sanchez

// used for printing next node in the same level,
// this is the x coordinate of the next char printed
let printNext = 0;

//adjust gap between left and right nodes
const gap = 3;

const MAX_HEIGHT = 1000;
const leftProfile = new Array(MAX_HEIGHT);
const rightProfile = new Array(MAX_HEIGHT);

// ascii tree structure
function ASCIINode() {
  this.left = null;
  this.right = null;

  // length of the edge from this node to its children
  this.edgeLength = null;

  this.height = null;
  this.labelLength = null;

  // -1 = I am left, 0 = I am root, 1 = right
  this.parentDirection = null;

  this.label = null;
}

// This function prints the given level of the given tree, assuming
// that the node has the given x cordinate.
function printLevel(node, x, level) {
  if (node === null)
    return;

  const isLeft = node.parentDirection === -1;

  if (level === 0) {
    let result = '';
    const half = Math.floor((node.labelLength - isLeft) / 2);
    const length = x - printNext - half;

    for (let i = 0; i < length; i++) {
      result += ' ';
    }

    printNext += length;
    result += node.label;
    printNext += node.labelLength;

    process.stdout.write(result);
  } else if (node.edgeLength >= level) {
    let result = '';

    if (node.left !== null) {
      const length = x - printNext - level;

      for (let i = 0; i < length; i++) {
        result += ' ';
      }

      printNext += length;
      result += '/';
      printNext += 1;
    }

    if (node.right !== null) {
      const length = x - printNext + level;

      for (let i = 0; i < length; i++) {
        result += ' ';
      }

      printNext += length;
      result += '\\';
      printNext += 1;
    }

    process.stdout.write(result);
  } else {
    printLevel(node.left, x - node.edgeLength - 1, level - node.edgeLength - 1);
    printLevel(node.right, x + node.edgeLength + 1, level - node.edgeLength - 1);
  }
}

// This function fills in the edgeLength and
// height fields of the specified tree
function computeEdgeLengths(node) {
  if (node === null)
    return;

  computeEdgeLengths(node.left);
  computeEdgeLengths(node.right);

  if (node.left === null && node.right === null) {
    node.edgeLength = 0;
  } else {
    let minimumHeight = null;

    if (node.left !== null) {
      for (let i = 0; i < node.left.height && i < MAX_HEIGHT; i++) {
        rightProfile[i] = Number.NEGATIVE_INFINITY;
      }

      computeRightProfile(node.left, 0, 0);
      minimumHeight = node.left.height;
    } else {
      minimumHeight = 0;
    }

    if (node.right !== null) {
      for (let i = 0; i < node.right.height && i < MAX_HEIGHT; i++) {
        leftProfile[i] = Number.POSITIVE_INFINITY;
      }

      computeLeftProfile(node.right, 0, 0);
      minimumHeight = Math.min(node.right.height, minimumHeight);
    } else {
      minimumHeight = 0;
    }

    let delta = 4;

    for (let i = 0; i < minimumHeight; i++) {
      delta = Math.max(delta, gap + 1 + rightProfile[i] - leftProfile[i]);
    }

    // If the node has two children of height 1, then we allow the
    // two leaves to be within 1, instead of 2
    const condition1 = node.left !== null && node.left.height === 1;
    const condition2 = node.right !== null && node.right.height === 1;

    if ((condition1 || condition2) && delta > 4) {
      delta--;
    }

    node.edgeLength = Math.floor(((delta + 1) / 2) - 1);
  }

  // now fill in the height of node
  let height = 1;

  if (node.left !== null) {
    height = Math.max(node.left.height + node.edgeLength + 1, height);
  }

  if (node.right !== null) {
    height = Math.max(node.right.height + node.edgeLength + 1, height);
  }

  node.height = height;
}


function buildASCIITreeRecursive(tree) {
  if (tree === null)
    return null;

  const node = new ASCIINode();
  node.left = buildASCIITreeRecursive(tree.left);
  node.right = buildASCIITreeRecursive(tree.right);

  if (node.left !== null)
    node.left.parentDirection = -1;

  if (node.right !== null)
    node.right.parentDirection = 1;

  node.label = tree.val + ''; // cast to string
  node.labelLength = node.label.length;

  return node;
}

// Copy the tree into the ascii node structre
function buildASCIITree(tree) {
  if (tree === null)
      return null;

  const node = buildASCIITreeRecursive(tree);
  node.parentDirection = 0;
  return node;
}

// The following function fills in the leftProfile array for the given tree.
// It assumes that the center of the label of the root of this tree
// is located at a position (x, y).  It assumes that the edge_length
// fields have been computed for this tree.
function computeLeftProfile(node, x, y) {
  if (node === null) return;

  const isLeft = (node.parentDirection === -1) ? 1 : 0;

  leftProfile[y] = Math.min(leftProfile[y], x - Math.floor((node.labelLength - isLeft) / 2));

  if (node.left !== null) {
    for (let i = 0; i <= node.edgeLength && (y + i) < MAX_HEIGHT; i++) {
      leftProfile[y + i] = Math.min(leftProfile[y + i], x - i);
    }
  }

  computeLeftProfile(node.left, x - node.edgeLength - 1, y + node.edgeLength + 1);
  computeLeftProfile(node.right, x + node.edgeLength + 1, y + node.edgeLength + 1);
}

function computeRightProfile(node, x, y) {
  if (node === null) return;

  const notLeft = (node.parentDirection !== -1) ? 1 : 0;

  rightProfile[y] = Math.max(rightProfile[y], x + (node.labelLength - notLeft) / 2);

  if (node.right !== null) {
    for (let i = 0; i <= node.edgeLength && (y + i) < MAX_HEIGHT; i++) {
      rightProfile[y + i] = Math.min(rightProfile[y + i], x + i);
    }
  }

  computeRightProfile(node.left, x - node.edgeLength - 1, y + node.edgeLength + 1);
  computeRightProfile(node.right, x + node.edgeLength + 1, y + node.edgeLength + 1);
}

// prints ascii tree for given Tree structure
function printASCIITree(tree) {
  if (tree === null) return;

  const root = buildASCIITree(tree);
  computeEdgeLengths(root);

  for (let i = 0; i < root.height && i < MAX_HEIGHT; i++)
    leftProfile[i] = Number.POSITIVE_INFINITY;

  computeLeftProfile(root, 0, 0);

  let minimumX = 0;

  for (let i = 0; i < root.height && i < MAX_HEIGHT; i++) {
    minimumX = Math.min(minimumX, leftProfile[i]);
  }

  for (let i = 0; i < root.height; i++) {
    printNext = 0;
    printLevel(root, -minimumX, i);
    process.stdout.write('\n');
  }

  if (root.height >= MAX_HEIGHT)
    console.log(`This tree is than ${MAX_HEIGHT}, and may be drawn incorrectly`);
}

module.exports = printASCIITree;
