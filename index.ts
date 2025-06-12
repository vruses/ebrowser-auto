import foo from "./src/foo";

// const foo = 3300;
console.log(foo);
setInterval(() => {
  console.log(foo);
}, foo);
