import {
  BrowserLaunchInfo,
  BrowserList,
  BrowserInfoWithRequiredId,
  BrowserShutdownInfo,
  SafeResult,
  PageParams,
} from "@/types/index";
import getHttpClient from "@/utils/httpFactory";

const httpClient = getHttpClient();

// 检查接口可用性
async function checkAvailability() {
  return httpClient
    .get<SafeResult>("/auto/status")
    .then((res) => {
      return res.msg === "success";
    })
    .catch((e) => {
      console.log(e);
      throw new Error("接口不可用！");
    });
}
// typo系后端返回
// 获取浏览器信息列表，数据会全部返回，和接口参数无关
async function getBrowserList(pageParam: PageParams) {
  return httpClient
    .get<BrowserList>("/auto/getBrowerList", pageParam)
    .then((res) => {
      console.log("浏览器列表获取完毕！");
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      throw new Error("获取浏览器列表失败");
    });
}
// 打开指定浏览器，可传入整个browserInfo对象，但必须包含id
async function openBrowser(browserInfo: BrowserInfoWithRequiredId) {
  return httpClient
    .post<BrowserLaunchInfo>("/auto/openBrower", browserInfo)
    .then((res) => {
      console.log(`已打开浏览器：${browserInfo.browerid}`);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      console.log("打开浏览器失败！");
    });
}
// 关闭指定浏览器
async function closeBrowser(browserInfo: BrowserInfoWithRequiredId) {
  return httpClient
    .post<BrowserShutdownInfo>("/auto/closeBrower", browserInfo)
    .then((res) => {
      console.log(`已关闭浏览器：${browserInfo.browerid}`);
      return res.msg === "success";
    })
    .catch((e) => {
      console.log(e);
      console.log("关闭浏览器失败！");
    });
}

export { checkAvailability, getBrowserList, openBrowser, closeBrowser };
