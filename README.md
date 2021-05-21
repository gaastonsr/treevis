# treevis

Treevis is a small utility to graph LeetCode trees. It's useful to debug visually test cases.

## How to Use

If you want to install it globally so it gets added to your `$PATH` you can do it with

```
$ npm install -g treevis
# or
$ yarn global add treevis
```

then

```
$ treevis <tree in array form>
```

Or if you don't want to install globally, and just want to run some tests

```
$ npx treevis <tree in array form>
```

## Example

Make sure to wrap your tree in single quotes otherwise your shell might try to interpret the square brackets.

```
$ npx treevis '[5,4,7,3,null,2,null,-1,null,9]'
       5
      / \
     /   \
    4     7
   /     /
  3     2
 /     /
-1    9
```
