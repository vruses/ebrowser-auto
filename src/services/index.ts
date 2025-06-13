import taskLoop from "@/services/task-loop";
import { openBrowser } from "@/services/task-service";
import taskSetup from "@/services/task-setup";
import { BrowserInfoWithRequiredId } from "@/types";

const WINDOW_SIZE = 20;

//任务初始化，获得browserList
// 记录起始下标，循环关闭添加窗口
async function runTask() {
  const start = 0;
  const browserList: BrowserInfoWithRequiredId[] = await taskSetup();
  const tasks = browserList.slice(start, WINDOW_SIZE);
  for (const task of tasks) {
    await openBrowser(task);
  }
  taskLoop(browserList, start, start + WINDOW_SIZE, WINDOW_SIZE);
}
export default runTask;
