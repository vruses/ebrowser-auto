interface BrowserInfo {
  browerid: string; //浏览器窗口id，传id时为修改，不传为创建
  browername: string; //浏览器窗口名称
  crxplug: string; //插件列表
  siteurl: string; //启动网址
  openmodel: string; //打开模式 1无痕 2固定
  cookie: string; //cookie json数据 详细见获取接口
  initCookie: boolean; //每次启动设置cookie
  getCookie: boolean; //自动从浏览器获取cookie，可能导致cookie丢失
  proxyType: string; //代理设置 1 不使用代理 2 自定义 3 api提取
  proxyProtocol: string; //代理类型 https socks5 http
  prHost: string; //代理主机
  prPort: string; //代理端口
  prAccount: string; //代理账号
  prPass: string; //代理密码
  prlink: string; //代理链接
  prGetType: string; //提取方式 1每次打开浏览器提取 2上次提取失败才提取
  agent: string;
  lastSession: boolean; //lastSession 保存会话
  timezone: boolean; //基于IP生成对应时区
  screen: string; //分辨率 1跟随电脑 2自定义
  screendata: string; //1024x768
  webrtc: string; //1禁用 2真实 3替换
  local: string; //地理位置 1禁用 2允许 3允许
  lag: boolean; //基于IP生成对应的语言
  lagStr: string; //界面语言
  canvas: string; //canvas 1噪音 2关闭
  font: string; //字体 1噪音 2关闭
  webgl: string; //WebGL图像 1噪音 2关闭
  webGLFac: string; //WebGL厂商
  webglRend: string; //WebGL渲染
  audiocontext: string; //audiocontext 1噪音 2关闭
  audiodevice: string; //audiocontext 1噪音 2关闭
  clientrects: string; //clientrects 1噪音 2关闭
  CPU: string; //CPU
  memory: string; //memory 内存
  deviceName: string; //设备名称 1默认 2自定义
  deviceNameStr: string;
  macAdd: string; //macAdd 1默认 2自定义
  macAddStr: string; //自定义
  track: boolean; //Do Not Track
  SSL: string; //SSL 1开启 2关闭
  portScan: string; //端口扫描保护 1开启 2关闭
  gpuget: boolean; //硬件加速
  speechvoices: string; //SpeechVoices 1噪音 2关闭
  GroupName: string; //分组
  startargs: string; //启动参数
}
interface Protocols {
  ws: string;
  http: string;
  session: string;
  datadir: string;
  driverPath: string;
  browerid: string;
}
interface PageParams {
  page: number;
  limit: number;
  browername: string;
}
type BrowserInfoWithRequiredId = {
  browerid: string;
} & Partial<Omit<BrowserInfo, "browerid">>;

export { BrowserInfo, Protocols, PageParams, BrowserInfoWithRequiredId };
