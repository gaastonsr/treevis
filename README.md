# treevis

Treevis is a small utility to graph LeetCode trees. It's useful to debug visually test cases.

## How to Use

```
$ npm install -g treevis
or
$ yarn global add treevis

then

$ treevis <array>
```

## Example

```
treevis [5,4,7,3,null,2,null,-1,null,9]
```

will produce

```
       5
      / \
     /   \
    4     7
   /     /
  3     2
 /     /
-1    9
```

## Disclaimer

Long trees don't always display correctly.

## Environments
- Bash: OK
- Zsh: Not OK (Run `exec bash` to switch from Zsh to Bash if you are using Mac terminal).
