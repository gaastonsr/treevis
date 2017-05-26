const TreeNode = require('./TreeNode');

function treeFromArray(array) {
  if (array.length === 0)
    return null;

  let nextItem = 0;
  const root = new TreeNode(array[nextItem++]);
  const queue = [root];

  while (queue.length > 0 && nextItem < array.length) {
    const current = queue.shift();

    if (nextItem < array.length) {
      const item = array[nextItem++];

      if (item) {
        const node = new TreeNode(item);
        current.left = node;
        queue.push(node);
      }
    }

    if (nextItem < array.length) {
      const item = array[nextItem++];

      if (item) {
        const node = new TreeNode(item);
        current.right = node;
        queue.push(node);
      }
    }
  }

  return root;
}

module.exports = treeFromArray;
