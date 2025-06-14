import taskLoop from "@/services/task-loop";
import { openBrowser } from "@/services/task-service";
import taskSetup from "@/services/task-setup";
import { BrowserInfoWithRequiredId } from "@/types";
import sleep from "@/utils/sleep";

const WINDOW_SIZE = 20;
const start = 0;

//任务初始化，获得browserList
// 记录起始下标，循环关闭添加窗口
async function runTask(delay: number) {
  const browserList: BrowserInfoWithRequiredId[] = await taskSetup();
  const tasks = browserList.slice(start, WINDOW_SIZE);
  for (const task of tasks) {
    await openBrowser(task);
    await sleep(delay);
  }
  taskLoop(browserList, start, start + WINDOW_SIZE, WINDOW_SIZE,delay);
}
export default runTask;
