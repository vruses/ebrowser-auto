import { checkAvailability, getBrowserList } from "@/services/task-service";
import { BrowserInfoWithRequiredId } from "@/types";

// 打开二十个窗口
async function taskSetup(): Promise<BrowserInfoWithRequiredId[]> {
  // 接口可用性
  const isUsable = await checkAvailability();
  if (isUsable) {
    // 获取浏览器列表
    const browserList = await getBrowserList({
      page: 1,
      limit: 30,
      browername: "",
    });
    // 取出每个对象id
    return browserList.map((value, index) => {
      return {
        browerid: value.browerid,
      };
    });
  } else {
    return [];
  }
}
export default taskSetup;
