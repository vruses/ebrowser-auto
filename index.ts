import {
  BrowserLaunchInfo,
  BrowserList,
  BrowserShutdownInfo,
  SafeResult,
} from "@/types/index";
import getHttpClient from "@/utils/httpFactory";

const httpClient = getHttpClient();

// 检查接口是否可用
httpClient.get<SafeResult>("/auto/status").then((res) => {
  console.log(res);
});
// 此typo系后端造成
// 数据会全部返回，和接口参数无关
setTimeout(() => {
  httpClient
    .get<BrowserList>("/auto/getBrowerList", {
      page: 1,
      limit: 30,
      browername: "",
    })
    .then((res) => {
      console.log(res);
    });
}, 1000);

setTimeout(() => {
  httpClient
    .post<BrowserLaunchInfo>("/auto/openBrower", {
      browerid: "68384371390fea598af68db9",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}, 1000);
setTimeout(() => {
  httpClient
    .post<BrowserShutdownInfo>("/auto/closeBrower", {
      browerid: "68384371390fea598af68db9",
    })
    .then((res) => {
      console.log(res);
    });
}, 1000);
