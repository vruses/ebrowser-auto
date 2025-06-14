import { closeBrowser, openBrowser } from "@/services/task-service";
import { BrowserInfoWithRequiredId } from "@/types";
import sleep from "@/utils/sleep";

async function taskLoop(
  browserList: BrowserInfoWithRequiredId[],
  startIndex: number,
  endIndex: number,
  windowSize: number,
  delay: number
) {
  while (true) {
    await closeBrowser(browserList[startIndex]);
    await sleep(delay);
    await openBrowser(browserList[endIndex]);
    await sleep(delay);
    startIndex = (startIndex + 1) % browserList.length;
    endIndex = (startIndex + windowSize) % browserList.length;
  }
}
export default taskLoop;
