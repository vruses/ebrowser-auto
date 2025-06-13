import { closeBrowser, openBrowser } from "@/services/task-service";
import { BrowserInfoWithRequiredId } from "@/types";

async function taskLoop(
  browserList: BrowserInfoWithRequiredId[],
  startIndex: number,
  endIndex: number,
  windowSize: number
) {
  while (true) {
    await closeBrowser(browserList[startIndex]);
    await openBrowser(browserList[endIndex]);
    startIndex = (startIndex + 1) % browserList.length;
    endIndex = (startIndex + windowSize) % browserList.length;
  }
}
export default taskLoop;
