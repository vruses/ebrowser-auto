import { BrowserInfo, Protocols } from "./entity";
//基础响应类
interface ResultType {
  code: number;
}
// 检查接口可用性
interface SafeResult extends ResultType {
  msg: string;
}
// BrowserList
interface BrowserList extends ResultType {
  data: BrowserInfo[];
  records: number;
  count: number;
}
// 打开浏览器响应
interface BrowserLaunchInfo extends ResultType {
  data: Protocols;
  status: number;
}
// 关闭浏览器响应
interface BrowserShutdownInfo extends ResultType {
  msg: string;
}

export {
  ResultType,
  SafeResult,
  BrowserList,
  BrowserLaunchInfo,
  BrowserShutdownInfo,
};
