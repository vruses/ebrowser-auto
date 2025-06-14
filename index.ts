import runTask from "@/services";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

async function askQuestion(query: string) {
  const rl = readline.createInterface({ input, output });
  const result = await rl.question(query);
  rl.close();
  return result;
}

async function main() {
  const delay = await askQuestion("请输入每次api请求的时间间隔：");
  if (!Number.isNaN(Number(delay))) {
    runTask(Number(delay));
  } else {
    runTask(0);
  }
}
main();
