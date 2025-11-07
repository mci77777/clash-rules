
// 前置 -> 落地 dialer-proxy 生成脚本（无 CommonJS 导出版）
// 适用：仅需要定义 main(params) 的运行环境（如 Clash Meta/Verg/某些订阅转换器的“脚本”执行环境）
// 说明：不要使用 module.exports / require / import。运行器会注入 params 并调用 main(params)。

const proxyName = "🔮 全局策略";
const frontNodeName = "🔗 前置节点组";
const landingNodeName = "🌍 落地节点";

const nodeFilterRegex = /^(?!.*(官网|套餐|流量| expiring|剩余|时间|重置|URL|到期|过期|机场|group|sub|订阅|查询|续费|观看|频道|客服|M3U|车费|车友|上车|通知|公告|严禁)).*$/i;

const countryRegions = [
  { code: "HK", name: "香港",     regex: /(香港|HK|Hong Kong|🇭🇰)/i },
  { code: "TW", name: "台湾",     regex: /(台湾|台灣|TW|Taiwan|🇹🇼)/i },
  { code: "SG", name: "新加坡",   regex: /(新加坡|狮城|SG|Singapore|🇸🇬)/i },
  { code: "JP", name: "日本",     regex: /(日本|JP|Japan|东京|🇯🇵)/i },
  { code: "US", name: "美国",     regex: /(美国|美國|US|USA|United States|America|🇺🇸)/i },
  { code: "DE", name: "德国",     regex: /(德国|DE|Germany|🇩🇪)/i },
  { code: "KR", name: "韩国",     regex: /(韩国|韓國|KR|Korea|South Korea|🇰🇷)/i },
  { code: "UK", name: "英国",     regex: /(英国|UK|United Kingdom|🇬🇧)/i },
  { code: "CA", name: "加拿大",   regex: /(加拿大|CA|Canada|🇨🇦)/i },
  { code: "AU", name: "澳大利亚", regex: /(澳大利亚|AU|Australia|🇦🇺)/i },
  { code: "FR", name: "法国",     regex: /(法国|FR|France|🇫🇷)/i },
  { code: "NL", name: "荷兰",     regex: /(荷兰|NL|Netherlands|🇳🇱)/i },
];

function getIconForGroup(groupName) {
  switch (groupName) {
    case "📱 社交媒体": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Facebook.png";
    case "🤖 AI 服务":  return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Bot.png";
    case "📺 YouTube":  return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png";
    case "🎵 Spotify":  return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Spotify.png";
    case "🎮 游戏平台": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Game.png";
    case "💻 微软服务": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png";
    case "🍎 苹果服务": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple.png";
    case "🔒 IP 伪装":  return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Lock.png";
    case "🍃 漏网之鱼": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png";
    case "🛑 广告拦截": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Advertising.png";
    case "🌍 落地节点": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png";
    case "🔗 前置节点组": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Proxy.png";
    default: return "";
  }
}

// 清理无用字段 + 关闭 UDP
function cleanProxyFields(params) {
  const fieldsToDelete = ['remaining','expire','reset','total','upload','download','usage','traffic','support_udp'];
  (params.proxies || []).forEach(p => {
    fieldsToDelete.forEach(f => { if (p && f in p) delete p[f]; });
    if (p) p.udp = false;
  });
}

// 通过 dialer-proxy 生成落地节点副本
function generateLandingNodes(originalProxies) {
  return (originalProxies || []).map(proxy => {
    const landingNode = JSON.parse(JSON.stringify(proxy));
    landingNode.name = `[落地]${proxy.name}`;
    landingNode['dialer-proxy'] = frontNodeName;
    landingNode.udp = false;
    return landingNode;
  });
}

// 规则（保持和 ini 侧一致的方向，具体 rule-providers 可按需拼接）
function overwriteRules(params) {
  // 这里不强制覆盖，按需追加/替换
  return params;
}

// 生成策略组（包含前置组与落地组 + 地区组）
function overwriteProxyGroups(params) {
  const TEST_URL = "https://www.gstatic.com/generate_204";
  const TEST_BASE = { url: TEST_URL, interval: 600, timeout: 3000, tolerance: 50, lazy: true };

  const frontProxies = params.proxies || [];
  const frontProxyNames = frontProxies.map(p => p.name);

  const landingProxies = generateLandingNodes(frontProxies);
  const landingProxyNames = landingProxies.map(p => p.name);
  params.proxies.push(...landingProxies);

  // 识别地区
  const availableCountryCodes = new Set();
  const otherProxies = [];
  for (const n of frontProxyNames) {
    let matched = false;
    for (const r of countryRegions) {
      if (r.regex.test(n)) { availableCountryCodes.add(r.code); matched = true; break; }
    }
    if (!matched) otherProxies.push(n);
  }

  // 区域自动与手动组（基于前置）
  const regionAutoGroups = [];
  const regionNodeGroups = [];
  for (const r of countryRegions) {
    if (!availableCountryCodes.has(r.code)) continue;
    regionAutoGroups.push({
      name: `${r.code} - 自动选择`,
      type: 'url-test',
      proxies: frontProxyNames.filter(p => r.regex.test(p)),
      hidden: true,
      ...TEST_BASE,
    });
    regionNodeGroups.push({
      name: `${r.name} - 节点选择`,
      type: 'select',
      proxies: [`${r.code} - 自动选择`, ...frontProxyNames.filter(p => r.regex.test(p))],
    });
  }

  const otherAutoGroup = otherProxies.length ? {
    name: "OTHERS - 自动选择",
    type: "url-test",
    proxies: otherProxies,
    hidden: true,
    ...TEST_BASE,
  } : null;

  const otherNodeGroup = otherProxies.length ? {
    name: "其他 - 节点选择",
    type: "select",
    proxies: ["OTHERS - 自动选择", ...otherProxies],
  } : null;

  // 前置组
  const frontNodeGroup = {
    name: frontNodeName,
    type: "select",
    icon: getIconForGroup(frontNodeName),
    proxies: ["DIRECT", ...frontProxyNames],
  };

  // 落地组（含自动测速与手动）
  const landingAutoGroup = {
    name: "🌐 落地节点 - 自动选择",
    type: "url-test",
    proxies: landingProxyNames,
    hidden: true,
    ...TEST_BASE,
  };
  const landingManualGroup = {
    name: "🧭 落地节点 - 手动选择",
    type: "select",
    proxies: landingProxyNames,
    hidden: false,
  };
  const landingNodeGroup = {
    name: landingNodeName,
    type: "select",
    icon: getIconForGroup(landingNodeName),
    proxies: [landingAutoGroup.name, landingManualGroup.name, "DIRECT"],
  };

  // 常用功能分组模板（默认走落地）
  const functionalGroupNames = [
    "🤖 AI 服务","📱 社交媒体","📺 YouTube","🎵 Spotify",
    "🎮 游戏平台","💻 微软服务","🍎 苹果服务","🔒 IP 伪装"
  ];
  const functionalGroups = functionalGroupNames.map(name => ({
    name,
    type: "select",
    icon: getIconForGroup(name),
    url: TEST_URL,
    proxies: [
      landingNodeName,
      proxyName,
      frontNodeName,
      "DIRECT",
      "ALL - 自动选择",
      ...regionNodeGroups.map(g => g.name),
      otherNodeGroup ? otherNodeGroup.name : null,
    ].filter(Boolean),
  }));

  // 全局策略组
  const globalGroup = {
    name: proxyName,
    type: "select",
    proxies: [landingNodeName, "♻️ 自动选择", "手动选择", "⚠️ 故障转移", frontNodeName, "DIRECT"],
  };

  const groups = [
    globalGroup,
    frontNodeGroup,
    landingNodeGroup,
    { name: "手动选择", type: "select", proxies: frontProxyNames },
    {
      name: "♻️ 自动选择",
      type: "select",
      proxies: ["ALL - 自动选择", ...regionAutoGroups.map(g => g.name), otherAutoGroup ? otherAutoGroup.name : null].filter(Boolean),
    },
    { name: "⚠️ 故障转移", type: "fallback", proxies: frontProxyNames, ...TEST_BASE },
    { name: "ALL - 自动选择", type: "url-test", proxies: frontProxyNames, hidden: true, ...TEST_BASE },
    ...functionalGroups,
    { name: "🍃 漏网之鱼", type: "select", icon: getIconForGroup("🍃 漏网之鱼"), proxies: [landingNodeName, proxyName, frontNodeName, "DIRECT"] },
    { name: "🛑 广告拦截", type: "select", icon: getIconForGroup("🛑 广告拦截"), proxies: ["REJECT", "DIRECT"] },
    ...regionAutoGroups,
    ...regionNodeGroups,
    otherAutoGroup,
    otherNodeGroup,
    landingAutoGroup,
    landingManualGroup,
  ].filter(Boolean);

  params["proxy-groups"] = groups;
  return params;
}

// DNS/内核轻量设置（可按需扩展）
function overwriteDns(params) {
  params["unified-delay"] = true;
  params["tcp-concurrent"] = true;
  return params;
}

// 入口：运行器应当调用 main(params)
function main(params) {
  if (!params || !params.proxies || !params.proxies.length) return params || {};
  params.proxies = params.proxies.filter(p => nodeFilterRegex.test(p.name));
  cleanProxyFields(params);
  overwriteRules(params);
  overwriteProxyGroups(params);
  overwriteDns(params);
  return params;
}
