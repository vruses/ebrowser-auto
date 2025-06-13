type MessageResolver = (url: string) => string;
const httpConfig: Record<string, string> = {
  default: "检查未知接口",
  "/auto/status": "检查接口可用性",
  "/atuo/getBrowerList": "获取浏览器列表",
  "/auto/openBrower": "打开浏览器",
  "/auto/closeBrower": "关闭浏览器",
};
export default httpConfig;
