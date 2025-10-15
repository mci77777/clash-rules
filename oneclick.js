// --- 全局常量 ---

const proxyName = "🔮 全局策略"; // 主策略组中文名称

const frontNodeName = "🔗 前置节点组"; // 前置节点组名称

const landingNodeName = "🌍 落地节点"; // 落地节点组名称

const nodeFilterRegex = /^(?!.*(官网|套餐|流量| expiring|剩余|时间|重置|URL|到期|过期|机场|group|sub|订阅|查询|续费|观看|频道|官网|客服|M3U|车费|车友|上车|通知|公告|严禁)).*$/i;

  

const countryRegions = [

  { code: "HK", name: "香港", regex: /(香港|HK|Hong Kong|🇭🇰)/i },

  { code: "TW", name: "台湾", regex: /(台湾|台灣|TW|Taiwan|🇹🇼)/i },

  { code: "SG", name: "新加坡", regex: /(新加坡|狮城|SG|Singapore|🇸🇬)/i },

  { code: "JP", name: "日本", regex: /(日本|JP|Japan|东京|🇯🇵)/i },

  { code: "US", name: "美国", regex: /(美国|美國|US|USA|United States|America|🇺🇸)/i },

  { code: "DE", name: "德国", regex: /(德国|DE|Germany|🇩🇪)/i },

  { code: "KR", name: "韩国", regex: /(韩国|韓國|KR|Korea|South Korea|🇰🇷)/i },

  { code: "UK", name: "英国", regex: /(英国|UK|United Kingdom|🇬🇧)/i },

  { code: "CA", name: "加拿大", regex: /(加拿大|CA|Canada|🇨🇦)/i },

  { code: "AU", name: "澳大利亚", regex: /(澳大利亚|AU|Australia|🇦🇺)/i },

  { code: "FR", name: "法国", regex: /(法国|FR|France|🇫🇷)/i },

  { code: "NL", name: "荷兰", regex: /(荷兰|NL|Netherlands|🇳🇱)/i },

];

  

/**

 * 清理代理节点对象中不必要的【信息类】字段

 * @param {object} params - 完整的配置对象

 */

function cleanProxyFields(params) {

  const fieldsToDelete = [

    'remaining', 'expire', 'reset', 'total', 'upload',

    'download', 'usage', 'traffic', 'support_udp',

  ];

  params.proxies.forEach(proxy => {

    fieldsToDelete.forEach(field => {

      if (proxy.hasOwnProperty(field)) {

        delete proxy[field];

      }

    });

  });

}

  

// 脚本主入口

function main(params) {

  if (!params.proxies || params.proxies.length === 0) return params;

  params.proxies = params.proxies.filter(p => nodeFilterRegex.test(p.name));

  cleanProxyFields(params);

  overwriteRules(params);

  overwriteProxyGroups(params);

  overwriteDns(params);

  return params;

}

  

// --- 辅助函数 ---

  

function getTestUrlForGroup(groupName) {

  switch (groupName) {

    case "📱 社交媒体": return "https://www.facebook.com/";

    case "📺 YouTube": return "https://www.youtube.com/";

    case "🤖 AI 服务": return "https://chat.openai.com/";

    case "🎵 Spotify": return "https://www.spotify.com/";

    case "💻 微软服务": return "http://msn.com/";

    default: return "http://www.gstatic.com/generate_204";

  }

}

  

function getIconForGroup(groupName) {

  switch (groupName) {

    case "📱 社交媒体": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Facebook.png";

    case "🤖 AI 服务": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Bot.png";

    case "📺 YouTube": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png";

    case "🎵 Spotify": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Spotify.png";

    case "🎮 游戏平台": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Game.png";

    case "💻 微软服务": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png";

    case "🍎 苹果服务": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple.png";

    case "🔒 IP 伪装": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Lock.png";

    case "🍃 漏网之鱼": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png";

    case "🛑 广告拦截": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Advertising.png";

    case "🌍 落地节点": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png";

    case "🔗 前置节点组": return "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Proxy.png";

    default: return "";

  }

}

  

// --- 核心功能函数 ---

  

function overwriteRules(params) {

  const rules = [

    // 应用规则

    "RULE-SET,AdBlock,🛑 广告拦截",

    "RULE-SET,OpenAI,🤖 AI 服务", "RULE-SET,Claude,🤖 AI 服务", "RULE-SET,Gemini,🤖 AI 服务",

    "RULE-SET,Copilot,🤖 AI 服务", "RULE-SET,Perplexity,🤖 AI 服务",

    "RULE-SET,Facebook,📱 社交媒体", "RULE-SET,telegramcidr,📱 社交媒体,no-resolve",

    "RULE-SET,YouTube,📺 YouTube", "RULE-SET,Spotify,🎵 Spotify", "RULE-SET,Game,🎮 游戏平台",

    "RULE-SET,Microsoft,💻 微软服务", "RULE-SET,Apple,🍎 苹果服务", "RULE-SET,AntiIPAttr,🔒 IP 伪装",

    // 直连规则 (已增强)

    "RULE-SET,direct,DIRECT", "RULE-SET,private,DIRECT", "RULE-SET,lancidr,DIRECT",

    "RULE-SET,cncidr,DIRECT", "RULE-SET,applications,DIRECT", "GEOIP,LAN,DIRECT,no-resolve",

    "RULE-SET,ChinaDomain,DIRECT", "RULE-SET,ChinaCompanyIp,DIRECT", "GEOIP,CN,DIRECT,no-resolve",

  

    // 代理规则 (三重保障)

    "RULE-SET,ProxyGFW," + proxyName,

    "RULE-SET,gfw," + proxyName,

    "RULE-SET,proxy," + proxyName,

    // 最终匹配

    "MATCH,🍃 漏网之鱼",

  ];

  const ruleProviders = {

    // 直连/私有网等 —— 不变

    direct: { type: "http", behavior: "domain", url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt", path: "./ruleset/direct.yaml", interval: 86400 },

    private: { type: "http", behavior: "domain", url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt", path: "./ruleset/private.yaml", interval: 86400 },

    lancidr: { type: "http", behavior: "ipcidr", url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt", path: "./ruleset/lancidr.yaml", interval: 86400 },

    cncidr: { type: "http", behavior: "ipcidr", url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt", path: "./ruleset/cncidr.yaml", interval: 86400 },

    applications: { type: "http", behavior: "classical", url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt", path: "./ruleset/applications.yaml", interval: 86400 },

  

    // 这些保持

    Facebook: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Facebook/Facebook.yaml", path: "./ruleset/Facebook.yaml", interval: 86400 },

    gfw: { type: "http", behavior: "domain", url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt", path: "./ruleset/gfw.yaml", interval: 86400 },

    proxy: { type: "http", behavior: "domain", url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt", path: "./ruleset/proxy.yaml", interval: 86400 },

    telegramcidr: { type: "http", behavior: "ipcidr", url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt", path: "./ruleset/telegramcidr.yaml", interval: 86400 },

  

    // —— 这里修正为 classical ——

    Perplexity: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/cutethotw/ClashRule/main/Rule/Perplexity.list", path: "./ruleset/Perplexity.yaml", interval: 86400 },

    AdBlock: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list", path: "./ruleset/AdBlock.yaml", interval: 86400 },

    ProxyGFW: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list", path: "./ruleset/ProxyGFW.yaml", interval: 86400 },

    ChinaDomain: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list", path: "./ruleset/ChinaDomain.yaml", interval: 86400 },

  

    // 其它保持

    OpenAI: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml", path: "./ruleset/OpenAI.yaml", interval: 86400 },

    Claude: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml", path: "./ruleset/Claude.yaml", interval: 86400 },

    Gemini: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Gemini/Gemini.yaml", path: "./ruleset/Gemini.yaml", interval: 86400 },

    Copilot: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Copilot/Copilot.yaml", path: "./ruleset/Copilot.yaml", interval: 86400 },

    YouTube: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml", path: "./ruleset/YouTube.yaml", interval: 86400 },

    Spotify: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml", path: "./ruleset/Spotify.yaml", interval: 86400 },

    Game: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.yaml", path: "./ruleset/Game.yaml", interval: 86400 },

    Microsoft: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft.yaml", path: "./ruleset/Microsoft.yaml", interval: 86400 },

    Apple: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple.yaml", path: "./ruleset/Apple.yaml", interval: 86400 },

    AntiIPAttr: { type: "http", behavior: "classical", url: "https://raw.githubusercontent.com/lwd-temp/anti-ip-attribution/main/generated/rule-provider.yaml", path: "./ruleset/AntiIPAttr.yaml", interval: 86400 },

    ChinaCompanyIp: { type: "http", behavior: "ipcidr", url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list", path: "./ruleset/ChinaCompanyIp.yaml", interval: 86400 },

  };

  

  params["rule-providers"] = { ...params["rule-providers"], ...ruleProviders };

  params.rules = rules;

}

  

function overwriteProxyGroups(params) {

  const allProxies = params.proxies.map(p => p.name);

  const otherProxies = [];

  const availableCountryCodes = new Set();

  

  // 区域识别（仅用于分组展示；不纳入链路组合）

  for (const n of allProxies) {

    let matched = false;

    for (const r of countryRegions) {

      if (r.regex.test(n)) {

        availableCountryCodes.add(r.code);

        matched = true;

        break;

      }

    }

    if (!matched) otherProxies.push(n);

  }

  

  // 原始节点（不含后面新增的组合）

  const originalProxies = params.proxies.filter(p => allProxies.includes(p.name));

  

  // —— 生成“前置→落地”的组合节点（跳过前置===落地；修正UDP）——

  const landingProxies = [];

  for (const frontProxy of originalProxies) {

    for (const landProxy of originalProxies) {

      if (frontProxy.name === landProxy.name) continue; // ★ 关键修复：避免自引用

  

      const combined = JSON.parse(JSON.stringify(landProxy));

      combined.name = `[${frontProxy.name}]→[${landProxy.name}]`;

      combined['dialer-proxy'] = frontProxy.name;

  

      // 若双方都支持UDP，则组合才标记为UDP可用；否则明确置为false，避免误导

      if ('udp' in landProxy || 'udp' in frontProxy) {

        combined.udp = Boolean(landProxy.udp !== false && frontProxy.udp !== false);

      }

      landingProxies.push(combined);

    }

  }

  params.proxies.push(...landingProxies);

  

  const allCombinedProxies = landingProxies.map(p => p.name);

  

  // —— url-test 通用测速参数（降低压力）——

  const TEST_URL = 'http://www.gstatic.com/generate_204';

  const TEST_BASE = { url: TEST_URL, interval: 600, timeout: 1500, tolerance: 100, lazy: true };

  

  // 区域自动/手动

  const regionAutoGroups = countryRegions

    .filter(r => availableCountryCodes.has(r.code))

    .map(r => ({

      name: `${r.code} - 自动选择`,

      type: 'url-test',

      proxies: allProxies.filter(p => r.regex.test(p)),

      hidden: true,

      ...TEST_BASE,

    }));

  

  const regionNodeGroups = countryRegions

    .filter(r => availableCountryCodes.has(r.code))

    .map(r => ({

      name: `${r.name} - 节点选择`,

      type: 'select',

      proxies: [

        `${r.code} - 自动选择`,

        ...allProxies.filter(p => r.regex.test(p)),

      ],

    }));

  

  const otherAutoGroup = otherProxies.length > 0 ? {

    name: 'OTHERS - 自动选择',

    type: 'url-test',

    proxies: otherProxies,

    hidden: true,

    ...TEST_BASE,

  } : null;

  

  const otherNodeGroup = otherProxies.length > 0 ? {

    name: '其他 - 节点选择',

    type: 'select',

    proxies: ['OTHERS - 自动选择', ...otherProxies],

  } : null;

  

  // 前置节点组（供用户手动指定某个前置）

  const frontNodeGroup = {

    name: frontNodeName,

    type: 'select',

    icon: getIconForGroup(frontNodeName),

    proxies: ['DIRECT', ...allProxies],

  };

  

  // —— 按前置划分的“落地自动/选择”（每个前置对应一行组合）——

  const landingGroupsByFront = originalProxies.map(frontProxy => ({

    name: `[${frontProxy.name}] - 落地自动`,

    type: 'url-test',

    proxies: originalProxies

      .filter(landProxy => landProxy.name !== frontProxy.name)

      .map(landProxy => `[${frontProxy.name}]→[${landProxy.name}]`),

    hidden: true,

    ...TEST_BASE,

  }));

  

  const landingSelectGroupsByFront = originalProxies.map(frontProxy => ({

    name: `[${frontProxy.name}] - 落地选择`,

    type: 'select',

    hidden: true,

    proxies: [

      `[${frontProxy.name}] - 落地自动`,

      ...originalProxies

        .filter(landProxy => landProxy.name !== frontProxy.name)

        .map(landProxy => `[${frontProxy.name}]→[${landProxy.name}]`)

    ],

  }));

  

  // 全局落地自动（从所有“前置→落地”组合里挑最快）

  const allLandingAutoGroup = {

    name: "🌐 全局落地 - 自动",

    type: "url-test",

    proxies: allCombinedProxies,

    hidden: true,

    ...TEST_BASE,

  };

  

  // 落地节点总组（链路入口，建议在各功能策略中优先使用）

  const landingNodeGroup = {

    name: landingNodeName,

    type: 'select',

    icon: getIconForGroup(landingNodeName),

    proxies: [

      "🌐 全局落地 - 自动",

      ...landingSelectGroupsByFront.map(g => g.name),

      'DIRECT',

    ],

  };

  

  const functionalGroupNames = [

    "🤖 AI 服务", "📱 社交媒体", "📺 YouTube", "🎵 Spotify",

    "🎮 游戏平台", "💻 微软服务", "🍎 苹果服务", "🔒 IP 伪装"

  ];

  

  const functionalGroups = functionalGroupNames.map(name => ({

    name,

    type: "select",

    icon: getIconForGroup(name),

    url: getTestUrlForGroup(name),

    proxies: [

      landingNodeName,     // ★ 让功能策略默认先选“链路”

      proxyName,

      frontNodeName,       // 如需只走前置/只走落地，可手动切换

      "DIRECT",

      "ALL - 自动选择",

      ...regionNodeGroups.map(g => g.name),

      otherNodeGroup ? otherNodeGroup.name : null,

    ].filter(Boolean),

  }));

  

  const groups = [

    // ★ 全局策略默认走“链路”

    { name: proxyName, type: "select", proxies: ["🌐 全局落地 - 自动", landingNodeName, "♻️ 自动选择", "手动选择", "⚠️ 故障转移", frontNodeName, "DIRECT"] },

  

    frontNodeGroup,

    landingNodeGroup,

  

    { name: "手动选择", type: "select", proxies: allProxies },

  

    {

      name: "♻️ 自动选择",

      type: "select",

      proxies: [

        "ALL - 自动选择",

        ...regionAutoGroups.map(g => g.name),

        otherAutoGroup ? otherAutoGroup.name : null,

      ].filter(Boolean)

    },

    {

      name: "⚠️ 故障转移",

      type: 'fallback',

      proxies: allProxies,

      ...TEST_BASE,

    },

    {

      name: "ALL - 自动选择",

      type: "url-test",

      proxies: allProxies,

      hidden: true,

      ...TEST_BASE,

    },

  

    ...functionalGroups,

  

    {

      name: "🍃 漏网之鱼",

      type: "select",

      icon: getIconForGroup("🍃 漏网之鱼"),

      proxies: [landingNodeName, proxyName, frontNodeName, "DIRECT"]

    },

    {

      name: "🛑 广告拦截",

      type: "select",

      icon: getIconForGroup("🛑 广告拦截"),

      proxies: ["REJECT", "DIRECT"]

    },

  

    ...regionAutoGroups,

    ...regionNodeGroups,

    otherAutoGroup,

    otherNodeGroup,

  

    // 落地相关隐藏组

    allLandingAutoGroup,

    ...landingGroupsByFront,

    ...landingSelectGroupsByFront,

  ].filter(Boolean);

  

  params["proxy-groups"] = groups;

}

  

function overwriteDns(params) {

  const cnDnsList = ["https://223.5.5.5/dns-query", "https://1.12.12.12/dns-query"];

  const trustDnsList = ["https://1.0.0.1/dns-query", "https://1.1.1.1/dns-query"];

  

  const dnsOptions = {

    enable: true,

    "prefer-h3": true,

    "enhanced-mode": "fake-ip",         // ★ 切换为 fake-ip

    "fake-ip-range": "198.18.0.0/16",

    "fake-ip-filter": [

      // 避免某些站点/域名需要真实IP

      "+.lan", "+.local", "localhost",

      "dns.msftncsi.com", "www.msftconnecttest.com",

      "dnsleaktest.com", "ipleak.net",

      "time.apple.com", "time.windows.com",

      "pool.ntp.org", "+.pool.ntp.org",

      "stun.l.google.com", "+.stun.*", "+.stun.*.*",

      "connectivitycheck.gstatic.com", "connectivitycheck.android.com",

      "+.srv.nintendo.net", "xbox.*.microsoft.com", "+.playstation.net",

      "steamcontent.com", "+.steamcontent.com"

    ],

    "default-nameserver": cnDnsList,

    nameserver: trustDnsList,

    "nameserver-policy": {

      "geosite:cn": cnDnsList,

      "geoip:cn": cnDnsList,

    },

    "use-hosts": true,

  };

  

  const otherOptions = {

    "unified-delay": true,      // ★ 展示统一延迟，更贴合 url-test 的结果

    "tcp-concurrent": true,

    profile: {

      "store-selected": true,

      "store-fake-ip": true

    },

    sniffer: {

      enable: true,

      sniff: {

        TLS: { ports: [443, 8443] },

        HTTP: { ports: [80, "8080-8880"], "override-destination": true }

      }

    },

    "geodata-mode": true,

    "geox-url": {

      geoip: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",

      geosite: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",

      mmdb: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb",

    },

  };

  

  params.dns = { ...params.dns, ...dnsOptions };

  Object.assign(params, otherOptions);

}
