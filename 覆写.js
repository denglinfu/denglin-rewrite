/************** 参考 Verge Rev 示例 Script 配置***************************************
 * 链  接 :https://github.com/Moli-X/Resources/raw/main/Clash/Script/MihomoParty.js            
 * Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 0.5.8)
 * 最后更新时间:   2024-01-04 23:21
 **********************************************************************************/


//规则集通用配置设置 
const ruleProviderText = { "type": "http", "format": "text", "behavior": "classical", "interval": 86400 };
const ruleProviderYaml = { "type": "http", "format": "yaml", "behavior": "classical", "interval": 86400 };
// 策略组通用配置
const groupBaseOption  = { "interval": 300, "url": "http://connectivitycheck.gstatic.com/generate_204", "max-failed-times": 3, "type": "select" };
const groupBaseArea    = { "interval": 300, "url": "http://connectivitycheck.gstatic.com/generate_204", "max-failed-times": 3, "type": "url-test", "lazy": true, "interval": 300, "tolerance": 0, "hidden": false, "include-all": true };

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0; 
  const proxyProviderCount = typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0; 
  if (proxyCount === 0 && proxyProviderCount === 0) { throw new Error("配置文件中未找到任何代理"); }

// 覆盖通用配置
  config["mixed-port"] = "7890";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["unified-delay"] = "true";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";

// 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": ["*", "+.lan", "+.local", "+.direct", "+.msftconnecttest.com", "+.msftncsi.com"],
    "default-nameserver": ["system"],
    "nameserver": ["223.5.5.5", "119.29.29.29", "180.184.1.1"],
    "nameserver-policy": {
      "geosite:cn": "system",
      "geosite:gfw,geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]  } };

// 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://mirror.ghproxy.com/https://github.com/Moli-X/Tool/raw/X/GeoIP/geoip-lite.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/Moli-X/Tool/raw/X/GeoIP/geosite.dat",
    "mmdb": "https://mirror.ghproxy.com/https://github.com/Moli-X/Tool/raw/X/GeoIP/country-lite.mmdb",
    "asn": "https://mirror.ghproxy.com/https://github.com/Moli-X/Tool/raw/X/GeoIP/GeoLite2-ASN.mmdb"  };

// 覆盖 sniffer 配置
  config["sniffer"] = { 
	  "enable": true, "parse-pure-ip": true, 
      "sniff": { "TLS": { "ports": ["443", "8443"] }, 
      "HTTP": { "ports": ["80", "8080-8880"], "override-destination": true }, 
      "QUIC": { "ports": ["443", "8443"] } } };

// 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["any:53"]  };

// 覆盖策略组
  config["proxy-groups"] = [
    { ...groupBaseOption, "name": "手动选择", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/WiFi.png", "proxies": ["低倍节点", "全部节点"] },
    { ...groupBaseOption, "name": "AI服务", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/AI.png", "proxies": ["手动选择", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"] },
    { ...groupBaseOption, "name": "微软服务", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Microsoft.png", "proxies": ["手动选择", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "DIRECT"] },
    { ...groupBaseOption, "name": "谷歌服务", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png", "proxies": ["手动选择", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"] },
    { ...groupBaseOption, "name": "电报消息", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram_X.png", "proxies": ["手动选择", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点"] },
    { ...groupBaseArea, "name": "香港节点", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png", "filter": "(?i)🇭🇰|香港|(\b(HK|Hong)\b)" },
    { ...groupBaseArea, "name": "美国节点", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png", "filter": "(?i)🇺🇸|美国|洛杉矶|圣何塞|(\b(US|United States)\b)" },
    { ...groupBaseArea, "name": "狮城节点", "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png", "filter": "(?i)🇸🇬|新加坡|狮|(\b(SG|Singapore)\b)", },
    { ...groupBaseArea, "name": "日本节点", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png", "filter": "(?i)🇯🇵|日本|东京|(\b(JP|Japan)\b)", },
    { ...groupBaseArea, "name": "台湾节点", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png", "filter": "(?i)🇨🇳|🇹🇼|台湾|(\b(TW|Tai|Taiwan)\b)" },
    { ...groupBaseOption, "name": "全国直连", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Direct.png", "proxies": ["DIRECT", "PASS"] },
    { ...groupBaseOption, "name": "广告拦截", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Reject.png", "proxies": ["REJECT", "DIRECT", "PASS"] },
    { ...groupBaseOption, "name": "兜底分流", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png", "proxies": ["手动选择", "香港节点", "美国节点", "狮城节点", "日本节点", "台湾节点", "DIRECT", "PASS"] },
    { ...groupBaseArea, "name": "低倍节点", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Ring.png", "filter": "(?i)0.20x" },
    { ...groupBaseArea, "name": "全部节点", "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png", "exclude-filter": "群|邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|访问|加入|(\b(USE|Panel|Channel|Author)\b)" },
  ];

// 覆盖规则集
  config["rule-providers"] = {
	  "Google":         { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Google/Google.yaml",                     "path": "./Ruleset/Google.yaml" },
	  "YouTube":        { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml",                    "path": "./Ruleset/YouTube.yaml" },
	  "Telegram":       { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Telegram/Telegram.yaml",                  "path": "./Ruleset/Telegram.yaml" },
	  "Steam":          { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.yaml",                        "path": "./Ruleset/Steam.yaml" },
	  "OpenAI":         { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml",                      "path": "./Ruleset/OpenAI.yaml" },
    "Copilot":        { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Copilot/Copilot.yaml",                    "path": "./Ruleset/Copilot.yaml" },
    "Claude":         { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",                      "path": "./Ruleset/Claude.yaml" },
	  "Spotify":        { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml",                    "path": "./Ruleset/Spotify.yaml" },
	  "OneDrive":       { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OneDrive/OneDrive.yaml",                  "path": "./Ruleset/OneDrive.yaml" },
	  "Github":         { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GitHub/GitHub.yaml",                      "path": "./Ruleset/Github.yaml" },
	  "Microsoft":      { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft.yaml",                "path": "./Ruleset/Microsoft.yaml" },
	  "Lan":            { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Lan/Lan.yaml",                            "path": "./Ruleset/Lan.yaml" },
    "ProxyGFW":       { ...ruleProviderText, "url": "https://github.com/Moli-X/Tool/raw/X/Clash/Rules/ProxyGFW.list",                                                           "path": "./Ruleset/ProxyGFW.list" },
	  "China":          { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/China/China.yaml",                        "path": "./Ruleset/China.yaml" },
    "iCloudChina":    { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/iCloud/iCloud.yaml",                      "path": "./Ruleset/iCloud.yaml" },
    "Apple":          { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple.yaml",                        "path": "./Ruleset/Apple.yaml" },
    "115":            { ...ruleProviderYaml, "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/115/115.yaml",                            "path": "./Ruleset/115.yaml" }
  };

// 覆盖规则
  config["rules"] = [
    //软件分流
    "PROCESS-NAME,Qzhddr.exe,广告拦截",
    "PROCESS-NAME,QzhddrUpdate.exe,广告拦截",
    "PROCESS-NAME,QzhddrSrv.exe,广告拦截",
    "PROCESS-NAME,QzhddrAgent.exe,广告拦截",
    "PROCESS-NAME,BDLDaemon,广告拦截",
    "PROCESS-PATH,Bitdefender,广告拦截",
    // IP-CIDR 规则
    "IP-CIDR,10.13.9.207/32,广告拦截",
    "IP-CIDR,112.126.92.16/32,广告拦截",
    "IP-CIDR,104.194.69.43/32,全国直连",    
    "IP-CIDR,154.222.28.118/32,全国直连",   
    // DOMAIN-SUFFIX 规则
    "DOMAIN-SUFFIX,fudenglin.top,全国直连",
    "DOMAIN-SUFFIX,zhenguanyu.com,全国直连",
    "DOMAIN-SUFFIX,macked.app,AI服务",
    "DOMAIN-SUFFIX,agsvpt.com,AI服务",
    "DOMAIN-SUFFIX,xsus2025.xyz,全国直连",
    "DOMAIN-SUFFIX,max.codes,全国直连",
    "DOMAIN-SUFFIX,jiaoyanyun.com,全国直连",
    "DOMAIN-SUFFIX,yuanfudao.com,全国直连",
    "DOMAIN-SUFFIX,jyeoo.com,全国直连",
    "DOMAIN-SUFFIX,hdhive.online,AI服务",
    "DOMAIN-SUFFIX,hdhive.com,AI服务",
    "DOMAIN-SUFFIX,themoviedb.org,AI服务",
    "DOMAIN-KEYWORD,kelee.one,AI服务",
    "DOMAIN-KEYWORD,themoviedb,全国直连",
    "DOMAIN-KEYWORD,115cdn.com,全国直连",
    "DOMAIN-KEYWORD,fnos,全国直连",
    "PROCESS-NAME,mail,谷歌服务",
    //pt站点
    "DOMAIN-SUFFIX,piggo.me,全国直连",
    "DOMAIN-SUFFIX,mteam.cc,全国直连",
    "DOMAIN-SUFFIX,audiences.me,AI服务",
    "DOMAIN-SUFFIX,hhanclub.top,AI服务",
    "DOMAIN-SUFFIX,piggo.me,AI服务",
    "DOMAIN-SUFFIX,ourbits.club,AI服务",
    "DOMAIN-SUFFIX,hares.top,全国直连",
    "DOMAIN-SUFFIX,btschool.club,AI服务",
    "DOMAIN-SUFFIX,qingwapt.com,全国直连",
    //小分流
    "RULE-SET,Copilot,AI服务",
    "RULE-SET,Claude,AI服务",
    "RULE-SET,OpenAI,AI服务",
    "RULE-SET,YouTube,谷歌服务",
    "RULE-SET,Google,谷歌服务",
    "RULE-SET,Telegram,电报消息",
    "RULE-SET,Lan,全国直连",
    "RULE-SET,115,全国直连",
    "RULE-SET,iCloudChina,全国直连",
    "RULE-SET,Apple,全国直连",
    "RULE-SET,Github,全部节点",
    "RULE-SET,Microsoft,微软服务",
    "GEOSITE,onedrive,微软服务",
    "GEOSITE,gfw,全部节点",
    "GEOIP,lan,全国直连",
    "GEOIP,CN,全国直连",
    "MATCH,兜底分流"
  ];

// 返回修改后的配置
  return config;
}

//防止dns泄露
function DNSLeaksMain(settings) {
  // 填充rule-provider
  if (!settings['rule-providers']) {
    settings['rule-providers'] = {};
  }
  const newProvider = {
    type: "http",
    interval: 86400,
    behavior: "domain",
    format: "text",
    url: "https://github.com/Moli-X/Resources/raw/main/Filter/DNSLeaks.list"
  };
  settings['rule-providers']['DNSLeaks'] = newProvider;

  // 填充规则
  const matchRule = settings.rules.find(rule => rule.startsWith("MATCH"));
  const name = matchRule ? matchRule.split(",").pop() : null;
  const newRule = `RULE-SET,DNSLeaks,${name}`;
  if (name) {
    settings.rules.unshift(newRule);
  }

  // 修改dns为fakeip
  const dnssettings = settings.dns;
  if (!dnssettings['enhanced-mode'] || dnssettings['enhanced-mode'] !== "fake-ip") {
    dnssettings['enhanced-mode'] = "fake-ip";
  }

  return settings;
}
