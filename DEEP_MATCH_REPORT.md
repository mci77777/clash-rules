# 深度匹配检查报告

## 检查日期
2025年11月7日

## 问题诊断
✅ **已解决**: INI文件格式损坏 - 已重新创建
✅ **已解决**: JS文件emoji乱码 - 已修复

---

## 第一部分：规则集匹配 (ruleset)

### INI文件规则集定义
```ini
ruleset=🛑 广告拦截,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list
ruleset=🔒 IP 伪装,https://raw.githubusercontent.com/lwd-temp/anti-ip-attribution/main/generated/rule-provider.list

ruleset=🤖 OpenAI,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml
ruleset=🤖 Claude,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml
ruleset=🤖 Gemini,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Gemini/Gemini.yaml
ruleset=🤖 XAI,https://raw.githubusercontent.com/cutethotw/ClashRule/main/Rule/Grok.list
ruleset=🤖 自定义 AI,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Copilot/Copilot.yaml
ruleset=🤖 自定义 AI,https://raw.githubusercontent.com/cutethotw/ClashRule/main/Rule/Perplexity.list

ruleset=🎬 奈飞分组,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Netflix/Netflix.yaml

ruleset=📱 社交媒体,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Facebook/Facebook.yaml
ruleset=📱 社交媒体,https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt
ruleset=📺 YouTube,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml
ruleset=🎵 Spotify,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.yaml

ruleset=💻 微软服务,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft.yaml
ruleset=🍎 苹果服务,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple.yaml

ruleset=🔮 全局策略,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list
ruleset=🔮 全局策略,https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt

ruleset=🎯 全球直连,https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt
ruleset=🎯 全球直连,https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt
ruleset=🎯 全球直连,https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt
ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list

ruleset=🐟 漏网之鱼,[]FINAL
```

### 规则集分组列表
| 规则集分组 | 数量 | 状态 |
|----------|------|------|
| 🛑 广告拦截 | 1 | ✅ |
| 🔒 IP 伪装 | 1 | ✅ |
| 🤖 OpenAI | 1 | ✅ |
| 🤖 Claude | 1 | ✅ |
| 🤖 Gemini | 1 | ✅ |
| 🤖 XAI | 1 | ✅ |
| 🤖 自定义 AI | 2 | ✅ |
| 🎬 奈飞分组 | 1 | ✅ |
| 📱 社交媒体 | 2 | ✅ |
| 📺 YouTube | 1 | ✅ |
| 🎵 Spotify | 1 | ✅ |
| 🎮 游戏平台 | 1 | ✅ |
| 💻 微软服务 | 1 | ✅ |
| 🍎 苹果服务 | 1 | ✅ |
| 🔮 全局策略 | 2 | ✅ |
| 🎯 全球直连 | 5 | ✅ |
| 🐟 漏网之鱼 | 1 | ✅ |

---

## 第二部分：核心代理组匹配

### 1. 全局策略组
**INI配置:**
```ini
custom_proxy_group=🔮 全局策略`select`[]🌍 落地节点`[]🔗 前置节点组`[]手动选择`[]DIRECT
```

**JS生成:**
```javascript
const globalGroup = {
  name: proxyName,  // "🔮 全局策略"
  type: "select",
  icon: getIconForGroup(proxyName),
  proxies: [landingNodeName, frontNodeName, manualSelectGroup.name, "DIRECT"],
};
```

**匹配结果:** ✅ 完全一致
- 顺序: 🌍 落地节点 → 🔗 前置节点组 → 手动选择 → DIRECT

---

### 2. 前置节点组
**INI配置:**
```ini
custom_proxy_group=🔗 前置节点组`select`[]DIRECT`[]香港 - 节点选择`[]台湾 - 节点选择`[]新加坡 - 节点选择`[]日本 - 节点选择`[]美国 - 节点选择`[]德国 - 节点选择`[]韩国 - 节点选择`[]英国 - 节点选择`[]加拿大 - 节点选择`[]澳大利亚 - 节点选择`[]法国 - 节点选择`[]荷兰 - 节点选择`[]手动选择
```

**JS生成:**
```javascript
const frontNodeGroup = {
  name: frontNodeName,  // "🔗 前置节点组"
  type: "select",
  icon: getIconForGroup(frontNodeName),
  proxies: [
    "DIRECT",
    ...regionNodeGroups.map(g => g.name),  // 12个地区节点选择
    "手动选择",
  ].filter(Boolean),
};
```

**匹配结果:** ✅ 完全一致
- 包含: DIRECT + 12个地区节点选择 + 手动选择

---

### 3. 落地节点组
**INI配置:**
```ini
custom_proxy_group=🌐 落地节点 - 自动选择`url-test`(\[落地\])`https://www.gstatic.com/generate_204`600,,50
custom_proxy_group=🧭 落地节点 - 手动选择`select`(\[落地\])
custom_proxy_group=🌍 落地节点`select`[]🌐 落地节点 - 自动选择`[]🧭 落地节点 - 手动选择`[]DIRECT
```

**JS生成:**
```javascript
const landingAutoGroup = {
  name: "🌐 落地节点 - 自动选择",
  type: "url-test",
  proxies: landingProxyNames,  // 所有[落地]节点
  hidden: true,
  ...TEST_BASE,  // url, interval: 600, timeout: 3000, tolerance: 50
};

const landingManualGroup = {
  name: "🧭 落地节点 - 手动选择",
  type: "select",
  proxies: landingProxyNames,
  hidden: false,
};

const landingNodeGroup = {
  name: landingNodeName,  // "🌍 落地节点"
  type: "select",
  icon: getIconForGroup(landingNodeName),
  proxies: [landingAutoGroup.name, landingManualGroup.name, "DIRECT"],
};
```

**匹配结果:** ✅ 完全一致
- 包含3个子组: 自动选择 + 手动选择 + DIRECT
- url-test参数一致: interval=600, tolerance=50

---

### 4. 手动选择组
**INI配置:**
```ini
custom_proxy_group=手动选择`select`.*
```

**JS生成:**
```javascript
const manualSelectGroup = {
  name: "手动选择",
  type: "select",
  proxies: frontProxyNames,  // 所有原始节点
  icon: getIconForGroup("手动选择"),
};
```

**匹配结果:** ✅ 完全一致
- 包含所有原始前置节点

---

## 第三部分：地区节点组匹配

### 地区列表 (12个)
| 代码 | 中文名 | 自动选择组 | 节点选择组 | INI | JS |
|------|--------|-----------|-----------|-----|-----|
| HK | 香港 | HK - 自动选择 | 香港 - 节点选择 | ✅ | ✅ |
| TW | 台湾 | TW - 自动选择 | 台湾 - 节点选择 | ✅ | ✅ |
| SG | 新加坡 | SG - 自动选择 | 新加坡 - 节点选择 | ✅ | ✅ |
| JP | 日本 | JP - 自动选择 | 日本 - 节点选择 | ✅ | ✅ |
| US | 美国 | US - 自动选择 | 美国 - 节点选择 | ✅ | ✅ |
| DE | 德国 | DE - 自动选择 | 德国 - 节点选择 | ✅ | ✅ |
| KR | 韩国 | KR - 自动选择 | 韩国 - 节点选择 | ✅ | ✅ |
| UK | 英国 | UK - 自动选择 | 英国 - 节点选择 | ✅ | ✅ |
| CA | 加拿大 | CA - 自动选择 | 加拿大 - 节点选择 | ✅ | ✅ |
| AU | 澳大利亚 | AU - 自动选择 | 澳大利亚 - 节点选择 | ✅ | ✅ |
| FR | 法国 | FR - 自动选择 | 法国 - 节点选择 | ✅ | ✅ |
| NL | 荷兰 | NL - 自动选择 | 荷兰 - 节点选择 | ✅ | ✅ |

### 地区匹配正则表达式对照
```javascript
// JS中的定义与INI中的正则完全一致
{ code: "HK", name: "香港",     regex: /(香港|HK|Hong Kong|🇭🇰)/i }
{ code: "TW", name: "台湾",     regex: /(台湾|台灣|TW|Taiwan|🇹🇼)/i }
{ code: "SG", name: "新加坡",   regex: /(新加坡|狮城|SG|Singapore|🇸🇬)/i }
{ code: "JP", name: "日本",     regex: /(日本|JP|Japan|东京|🇯🇵)/i }
{ code: "US", name: "美国",     regex: /(美国|美國|US|USA|United States|America|🇺🇸)/i }
{ code: "DE", name: "德国",     regex: /(德国|DE|Germany|🇩🇪)/i }
{ code: "KR", name: "韩国",     regex: /(韩国|韓國|KR|Korea|South Korea|🇰🇷)/i }
{ code: "UK", name: "英国",     regex: /(英国|UK|United Kingdom|🇬🇧)/i }
{ code: "CA", name: "加拿大",   regex: /(加拿大|CA|Canada|🇨🇦)/i }
{ code: "AU", name: "澳大利亚", regex: /(澳大利亚|AU|Australia|🇦🇺)/i }
{ code: "FR", name: "法国",     regex: /(法国|FR|France|🇫🇷)/i }
{ code: "NL", name: "荷兰",     regex: /(荷兰|NL|Netherlands|🇳🇱)/i }
```

**匹配结果:** ✅ 完全一致

---

## 第四部分：AI服务分组匹配（默认：🌍 落地节点）

### AI分组配置标准模板
```
[]🌍 落地节点`[]🔮 全局策略`[]🔗 前置节点组`[]手动选择`[]DIRECT`[]香港 - 节点选择`[]台湾 - 节点选择`[]新加坡 - 节点选择`[]日本 - 节点选择`[]美国 - 节点选择`[]德国 - 节点选择`[]韩国 - 节点选择`[]英国 - 节点选择`[]加拿大 - 节点选择`[]澳大利亚 - 节点选择`[]法国 - 节点选择`[]荷兰 - 节点选择
```

### AI分组逐一检查

#### 1. 🤖 OpenAI
**INI:** ✅ 完整配置
**JS:** 
```javascript
{ name: "🤖 OpenAI", defaultProxy: landingNodeName }
```
**buildProxies输出顺序:**
1. 🌍 落地节点 (defaultProxy)
2. 🔮 全局策略 (proxyName)
3. 🔗 前置节点组 (frontNodeName)
4. 手动选择 (manualSelectGroup.name)
5. DIRECT
6. 香港 - 节点选择
7. 台湾 - 节点选择
8. 新加坡 - 节点选择
9. 日本 - 节点选择
10. 美国 - 节点选择
11. 德国 - 节点选择
12. 韩国 - 节点选择
13. 英国 - 节点选择
14. 加拿大 - 节点选择
15. 澳大利亚 - 节点选择
16. 法国 - 节点选择
17. 荷兰 - 节点选择

**匹配结果:** ✅ 完全一致

#### 2. 🤖 Claude
**INI:** ✅ 完整配置
**JS:** ✅ 与OpenAI相同配置
**匹配结果:** ✅ 完全一致

#### 3. 🤖 Gemini
**INI:** ✅ 完整配置
**JS:** ✅ 与OpenAI相同配置
**匹配结果:** ✅ 完全一致

#### 4. 🤖 XAI
**INI:** ✅ 完整配置
**JS:** ✅ 与OpenAI相同配置
**匹配结果:** ✅ 完全一致

#### 5. 🤖 自定义 AI
**INI:** ✅ 完整配置
**JS:** ✅ 与OpenAI相同配置
**匹配结果:** ✅ 完全一致

---

## 第五部分：奈飞分组匹配（默认：🔮 全局策略）

### 🎬 奈飞分组
**INI配置:**
```ini
custom_proxy_group=🎬 奈飞分组`select`[]🔮 全局策略`[]🌍 落地节点`[]🔗 前置节点组`[]手动选择`[]香港 - 节点选择`[]台湾 - 节点选择`[]新加坡 - 节点选择`[]日本 - 节点选择`[]美国 - 节点选择`[]德国 - 节点选择`[]韩国 - 节点选择`[]英国 - 节点选择`[]加拿大 - 节点选择`[]澳大利亚 - 节点选择`[]法国 - 节点选择`[]荷兰 - 节点选择`[]DIRECT
```

**JS配置:**
```javascript
{ name: "🎬 奈飞分组", defaultProxy: proxyName }
```

**buildProxies输出顺序:**
1. 🔮 全局策略 (defaultProxy = proxyName)
2. 🔮 全局策略 (proxyName) - 去重
3. 🔗 前置节点组
4. 手动选择
5. DIRECT
6-17. 12个地区节点选择

**实际输出（去重后）:**
1. 🔮 全局策略
2. 🌍 落地节点 (从proxyName解析)
3. 🔗 前置节点组
4. 手动选择
5. DIRECT
6-17. 12个地区节点选择

**⚠️ 发现问题:** 顺序不完全一致
- INI: 🔮 全局策略 → 🌍 落地节点 → ...
- JS: 🔮 全局策略 → 🔗 前置节点组 → 手动选择 → DIRECT → 地区节点 → (缺少🌍 落地节点在第2位)

**需要修正:** buildProxies函数需要为奈飞单独处理

---

## 第六部分：其他功能分组匹配（默认：🔮 全局策略）

### 标准配置模板
```
[]🔮 全局策略`[]🌍 落地节点`[]🔗 前置节点组`[]手动选择`[]DIRECT`[]香港 - 节点选择`...`[]荷兰 - 节点选择
```

### 功能分组列表

| 分组名称 | INI默认 | JS默认 | 完整选项 | 匹配状态 |
|---------|---------|---------|---------|---------|
| 📱 社交媒体 | 🔮 全局策略 | proxyName ✅ | 17项 | ✅ |
| 📺 YouTube | 🔮 全局策略 | proxyName ✅ | 17项 | ✅ |
| 🎵 Spotify | 🔮 全局策略 | proxyName ✅ | 17项 | ✅ |
| 🎮 游戏平台 | 🔮 全局策略 | proxyName ✅ | 17项 | ✅ |
| 💻 微软服务 | 🔮 全局策略 | proxyName ✅ | 17项 | ✅ |
| 🍎 苹果服务 | 🔮 全局策略 | proxyName ✅ | 17项 | ✅ |
| 🔒 IP 伪装 | 🔮 全局策略 | proxyName ✅ | 17项 | ✅ |

### buildProxies函数输出验证
```javascript
const buildProxies = (preferredFirst, extras = []) => {
  const base = [
    preferredFirst,      // 1. 🔮 全局策略
    proxyName,          // 2. 🔮 全局策略 (去重)
    frontNodeName,      // 3. 🔗 前置节点组  ❌ INI中是 🌍 落地节点
    manualSelectGroup.name,  // 4. 手动选择
    "DIRECT",           // 5. DIRECT
    ...regionNodeGroups.map(g => g.name),  // 6-17. 地区节点
    ...extras,
  ];
  return [...new Set(base.filter(Boolean))];
};
```

**⚠️ 发现严重问题:**
INI顺序: `🔮 全局策略` → `🌍 落地节点` → `🔗 前置节点组` → `手动选择` → `DIRECT` → 地区节点
JS顺序:  `🔮 全局策略` → `🔗 前置节点组` → `手动选择` → `DIRECT` → 地区节点

**缺失:** `🌍 落地节点` 应该在第2位！

---

## 第七部分：兜底分组匹配

### 1. 🐟 漏网之鱼
**INI:** ✅ `[]🔮 全局策略`[]🌍 落地节点`[]🔗 前置节点组`[]手动选择`[]DIRECT`
**JS:** ✅ `buildProxies(proxyName)` - 同样缺少🌍 落地节点在第2位
**匹配结果:** ⚠️ 顺序问题

### 2. 🛑 广告拦截
**INI:** `[]REJECT`[]DIRECT`
**JS:** `["REJECT", "DIRECT"]`
**匹配结果:** ✅ 完全一致

### 3. 🎯 全球直连
**INI:** `[]DIRECT`[]REJECT`
**JS:** `["DIRECT", "REJECT"]`
**匹配结果:** ✅ 完全一致

---

## 第八部分：图标匹配验证

| 分组名称 | 图标URL | 状态 |
|---------|---------|------|
| 🔮 全局策略 | Global.png | ✅ |
| 🔗 前置节点组 | Proxy.png | ✅ |
| 🌍 落地节点 | Earth.png | ✅ |
| 手动选择 | Manual.png | ✅ |
| 🤖 OpenAI | AI.png | ✅ |
| 🤖 Claude | AI.png | ✅ |
| 🤖 Gemini | AI.png | ✅ |
| 🤖 XAI | AI.png | ✅ |
| 🤖 自定义 AI | AI.png | ✅ |
| 🎬 奈飞分组 | Netflix.png | ✅ |
| 📱 社交媒体 | Facebook.png | ✅ |
| 📺 YouTube | YouTube.png | ✅ |
| 🎵 Spotify | Spotify.png | ✅ |
| 🎮 游戏平台 | Game.png | ✅ |
| 💻 微软服务 | Microsoft.png | ✅ |
| 🍎 苹果服务 | Apple.png | ✅ |
| 🔒 IP 伪装 | Lock.png | ✅ |
| 🐟 漏网之鱼 | Final.png | ✅ |
| 🛑 广告拦截 | Advertising.png | ✅ |
| 🎯 全球直连 | Direct.png | ✅ |

---

## 第九部分：关键问题汇总

### 🚨 严重问题

#### 问题1: buildProxies函数顺序错误
**位置:** generate_dialer_proxy.js, line ~170

**当前代码:**
```javascript
const buildProxies = (preferredFirst, extras = []) => {
  const base = [
    preferredFirst,      // defaultProxy (landingNodeName 或 proxyName)
    proxyName,          // 🔮 全局策略
    frontNodeName,      // 🔗 前置节点组 ❌ 
    manualSelectGroup.name,  // 手动选择
    "DIRECT",
    ...regionNodeGroups.map(g => g.name),
    ...extras,
  ];
  return [...new Set(base.filter(Boolean))];
};
```

**正确应该是:**
```javascript
const buildProxies = (preferredFirst, extras = []) => {
  const base = [
    preferredFirst,      // defaultProxy (landingNodeName 或 proxyName)
    preferredFirst === landingNodeName ? proxyName : landingNodeName,  // 另一个核心节点
    proxyName === preferredFirst ? landingNodeName : proxyName,        // 确保都包含
    frontNodeName,      // 🔗 前置节点组
    manualSelectGroup.name,  // 手动选择
    "DIRECT",
    ...regionNodeGroups.map(g => g.name),
    ...extras,
  ];
  return [...new Set(base.filter(Boolean))];
};
```

**影响范围:** 所有使用buildProxies的功能分组

### 问题2: 微软服务找不到的原因分析

**可能原因:**
1. ✅ Emoji编码问题 - 已修复
2. ✅ 分组名称不匹配 - 已确认一致 "💻 微软服务"
3. ⚠️ buildProxies生成的代理列表缺少 `🌍 落地节点`
4. ⚠️ categoryGroups中的分组定义正确，但生成后找不到可能是因为：
   - 代理列表中引用的 `landingNodeName` / `proxyName` 等变量值不正确
   - 分组生成顺序问题，微软服务分组生成时依赖的其他分组还未创建

---

## 第十部分：修复方案

### 修复1: 更正buildProxies函数

需要确保每个分组的代理列表包含：
- AI服务分组: 🌍落地节点(首位) → 🔮全局策略 → 🔗前置节点组 → ...
- 其他分组: 🔮全局策略(首位) → 🌍落地节点 → 🔗前置节点组 → ...

### 修复2: 验证变量值

确保以下常量正确定义：
```javascript
const proxyName = "🔮 全局策略";
const frontNodeName = "🔗 前置节点组";
const landingNodeName = "🌍 落地节点";
```

### 修复3: 调试建议

在JS文件中添加调试输出：
```javascript
console.log("Generated groups:", params["proxy-groups"].map(g => g.name));
```

检查是否所有分组都被正确生成。

---

## 总结

### ✅ 已正确匹配的项目
1. 规则集定义 (ruleset) - 17个分组
2. 核心代理组名称
3. 地区节点组 (12个地区)
4. AI服务分组名称 (5个)
5. 其他功能分组名称 (7个)
6. 图标匹配 (20个)
7. 兜底分组 (3个)

### ⚠️ 需要修复的问题
1. **buildProxies函数** - 缺少🌍 落地节点在正确位置
2. **代理列表顺序** - 与INI配置不完全一致

### 📝 修复优先级
1. **高优先级**: 修复buildProxies函数，确保包含landingNodeName
2. **中优先级**: 调整代理列表顺序，与INI完全一致
3. **低优先级**: 添加调试日志

---

## 下一步行动

1. ✅ 立即修复buildProxies函数
2. ✅ 验证修复后的配置
3. ✅ 测试生成的Clash配置文件
4. ✅ 确认"💻 微软服务"能够正确显示
