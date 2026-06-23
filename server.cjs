"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_http = __toESM(require("http"), 1);
var import_https = __toESM(require("https"), 1);
var import_socks_proxy_agent = require("socks-proxy-agent");
var import_http_proxy_agent = require("http-proxy-agent");
var import_https_proxy_agent = require("https-proxy-agent");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  const resolvedSubdomains = {};
  const parseServer3M3U = () => {
    const filePath = import_path.default.join(process.cwd(), "iptv-master", "server3.m3u");
    if (!import_fs.default.existsSync(filePath)) return [];
    const content = import_fs.default.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");
    const channels = [];
    let currentItem = {};
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("#EXTINF:")) {
        const parts = line.split(",");
        currentItem.name = parts.length > 1 ? parts[parts.length - 1].trim() : "Unknown";
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        if (logoMatch) currentItem.logo = logoMatch[1];
      } else if (line.startsWith("http")) {
        if (currentItem.name) {
          const nameLc = currentItem.name.toLowerCase();
          const urlLc = line.toLowerCase();
          let detectedCountry = "int";
          if (nameLc.includes("\u{1F1E7}\u{1F1E9}") || nameLc.includes("bangla") || nameLc.includes("btv") || nameLc.includes("somoy") || nameLc.includes("jamuna") || nameLc.includes("ekattor") || nameLc.includes("independent") || nameLc.includes("ntv") || nameLc.includes("deepto") || nameLc.includes("rajdhani") || nameLc.includes("bengali") || nameLc.includes("projapoti") || nameLc.includes("t sports") || urlLc.includes("tsports")) {
            detectedCountry = "bd";
          } else if (nameLc.includes("\u{1F1EE}\u{1F1F3}") || nameLc.includes("star sports") || nameLc.includes("sony sports") || nameLc.includes("willow") || nameLc.includes("fancode") || nameLc.includes("criclife")) {
            detectedCountry = "in";
          } else if (nameLc.includes("\u{1F1FA}\u{1F1F8}") || nameLc.includes("fox") || nameLc.includes("nbc") || nameLc.includes("telemundo") || nameLc.includes("fubo") || nameLc.includes("nba") || nameLc.includes("dazn")) {
            detectedCountry = "us";
          } else if (nameLc.includes("\u{1F1E7}\u{1F1F7}") || nameLc.includes("caze")) {
            detectedCountry = "br";
          } else if (nameLc.includes("\u{1F1EA}\u{1F1F8}") || nameLc.includes("laliga")) {
            detectedCountry = "es";
          } else if (nameLc.includes("\u{1F1E6}\u{1F1FA}")) {
            detectedCountry = "au";
          } else if (nameLc.includes("\u{1F1F9}\u{1F1F7}") || nameLc.includes("idman")) {
            detectedCountry = "tr";
          } else if (nameLc.includes("\u{1F1F5}\u{1F1F0}") || nameLc.includes("ptv")) {
            detectedCountry = "pk";
          } else if (nameLc.includes("\u{1F1EC}\u{1F1E7}") || nameLc.includes("sky sport")) {
            detectedCountry = "uk";
          } else if (nameLc.includes("\u{1F1F5}\u{1F1F9}")) {
            detectedCountry = "pt";
          } else if (nameLc.includes("ru") || nameLc.includes("\u{1F1F7}\u{1F1FA}") || nameLc.includes("\u043C\u0430\u0442\u0447")) {
            detectedCountry = "ru";
          } else if (nameLc.includes("fr") || nameLc.includes("\u{1F1EB}\u{1F1F7}") || nameLc.includes("eurosport")) {
            detectedCountry = "fr";
          } else if (nameLc.includes("colombia") || nameLc.includes("\u{1F1E8}\u{1F1F4}") || nameLc.includes("caracol") || nameLc.includes("rcn") || nameLc.includes("win sport")) {
            detectedCountry = "co";
          } else if (nameLc.includes("\u{1F1E6}\u{1F1F1}") || nameLc.includes("super sport")) {
            detectedCountry = "al";
          } else if (nameLc.includes("\u{1F1E8}\u{1F1FF}") || nameLc.includes("sport 1 hd") || nameLc.includes("sport 2 hd")) {
            detectedCountry = "cz";
          } else if (nameLc.includes("\u{1F1E7}\u{1F1EC}") || nameLc.includes("max sport")) {
            detectedCountry = "bg";
          } else if (nameLc.includes("\u{1F1ED}\u{1F1FA}") || nameLc.includes("m4 sport")) {
            detectedCountry = "hu";
          } else if (nameLc.includes("\u{1F1F3}\u{1F1F1}") || nameLc.includes("ziggo")) {
            detectedCountry = "nl";
          } else if (nameLc.includes("\u{1F1E6}\u{1F1F9}") || nameLc.includes("orf")) {
            detectedCountry = "at";
          } else if (nameLc.includes("\u{1F1FA}\u{1F1E6}") || nameLc.includes("suspilne") || nameLc.includes("setanta")) {
            detectedCountry = "ua";
          }
          channels.push({
            name: currentItem.name,
            url: line,
            logo: currentItem.logo || "",
            source: "3",
            country: detectedCountry
          });
          currentItem = {};
        }
      }
    }
    return channels;
  };
  let cachedServer3Channels = null;
  const getServer3Channels = () => {
    if (cachedServer3Channels) return cachedServer3Channels;
    try {
      const parsed = parseServer3M3U();
      cachedServer3Channels = parsed;
      return parsed;
    } catch (e) {
      console.error("Error parsing Server 3 channels:", e);
      return [];
    }
  };
  const parseServer4M3U = () => {
    const filePath = import_path.default.join(process.cwd(), "iptv-master", "server4.m3u");
    if (!import_fs.default.existsSync(filePath)) return [];
    const content = import_fs.default.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");
    const channels = [];
    let currentItem = {};
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("#EXTINF:")) {
        const parts = line.split(",");
        currentItem.name = parts.length > 1 ? parts[parts.length - 1].trim() : "Unknown";
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        if (logoMatch) currentItem.logo = logoMatch[1];
      } else if (line.startsWith("http")) {
        if (currentItem.name) {
          const nameLc = currentItem.name.toLowerCase();
          const urlLc = line.toLowerCase();
          let detectedCountry = "int";
          if (nameLc.includes("\u{1F1E7}\u{1F1E9}") || nameLc.includes("bangla") || nameLc.includes("btv") || nameLc.includes("somoy") || nameLc.includes("jamuna") || nameLc.includes("ekattor") || nameLc.includes("independent") || nameLc.includes("ntv") || nameLc.includes("deepto") || nameLc.includes("rajdhani") || nameLc.includes("bengali") || nameLc.includes("projapoti") || nameLc.includes("t sports") || urlLc.includes("tsports")) {
            detectedCountry = "bd";
          } else if (nameLc.includes("\u{1F1EE}\u{1F1F3}") || nameLc.includes("star sports") || nameLc.includes("sony sports") || nameLc.includes("willow") || nameLc.includes("fancode") || nameLc.includes("criclife")) {
            detectedCountry = "in";
          } else if (nameLc.includes("\u{1F1FA}\u{1F1F8}") || nameLc.includes("fox") || nameLc.includes("nbc") || nameLc.includes("telemundo") || nameLc.includes("fubo") || nameLc.includes("nba") || nameLc.includes("dazn")) {
            detectedCountry = "us";
          } else if (nameLc.includes("\u{1F1E7}\u{1F1F7}") || nameLc.includes("caze")) {
            detectedCountry = "br";
          } else if (nameLc.includes("\u{1F1EA}\u{1F1F8}") || nameLc.includes("laliga")) {
            detectedCountry = "es";
          } else if (nameLc.includes("\u{1F1E6}\u{1F1FA}")) {
            detectedCountry = "au";
          } else if (nameLc.includes("\u{1F1F9}\u{1F1F7}") || nameLc.includes("idman")) {
            detectedCountry = "tr";
          } else if (nameLc.includes("\u{1F1F5}\u{1F1F0}") || nameLc.includes("ptv")) {
            detectedCountry = "pk";
          } else if (nameLc.includes("\u{1F1EC}\u{1F1E7}") || nameLc.includes("sky sport")) {
            detectedCountry = "uk";
          } else if (nameLc.includes("\u{1F1F5}\u{1F1F9}")) {
            detectedCountry = "pt";
          } else if (nameLc.includes("ru") || nameLc.includes("\u{1F1F7}\u{1F1FA}") || nameLc.includes("\u043C\u0430\u0442\u0447")) {
            detectedCountry = "ru";
          } else if (nameLc.includes("fr") || nameLc.includes("\u{1F1EB}\u{1F1F7}") || nameLc.includes("eurosport")) {
            detectedCountry = "fr";
          } else if (nameLc.includes("colombia") || nameLc.includes("\u{1F1E8}\u{1F1F4}") || nameLc.includes("caracol") || nameLc.includes("rcn") || nameLc.includes("win sport")) {
            detectedCountry = "co";
          } else if (nameLc.includes("\u{1F1E6}\u{1F1F1}") || nameLc.includes("super sport")) {
            detectedCountry = "al";
          } else if (nameLc.includes("\u{1F1E8}\u{1F1FF}") || nameLc.includes("sport 1 hd") || nameLc.includes("sport 2 hd")) {
            detectedCountry = "cz";
          } else if (nameLc.includes("\u{1F1E7}\u{1F1EC}") || nameLc.includes("max sport")) {
            detectedCountry = "bg";
          } else if (nameLc.includes("\u{1F1ED}\u{1F1FA}") || nameLc.includes("m4 sport")) {
            detectedCountry = "hu";
          } else if (nameLc.includes("\u{1F1F3}\u{1F1F1}") || nameLc.includes("ziggo")) {
            detectedCountry = "nl";
          } else if (nameLc.includes("\u{1F1E6}\u{1F1F9}") || nameLc.includes("orf")) {
            detectedCountry = "at";
          } else if (nameLc.includes("\u{1F1FA}\u{1F1E6}") || nameLc.includes("suspilne") || nameLc.includes("setanta")) {
            detectedCountry = "ua";
          }
          channels.push({
            name: currentItem.name,
            url: line,
            logo: currentItem.logo || "",
            source: "4",
            country: detectedCountry
          });
          currentItem = {};
        }
      }
    }
    return channels;
  };
  let cachedServer4Channels = null;
  const getServer4Channels = () => {
    if (cachedServer4Channels) return cachedServer4Channels;
    try {
      const parsed = parseServer4M3U();
      cachedServer4Channels = parsed;
      return parsed;
    } catch (e) {
      console.error("Error parsing Server 4 channels:", e);
      return [];
    }
  };
  const getChannelKey = (urlStr) => {
    try {
      const u = new URL(urlStr);
      const parts = u.pathname.split("/");
      return parts.find((p) => p && p.trim() !== "") || "";
    } catch {
      return "";
    }
  };
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Range, Accept-Ranges");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  const proxyLocalCache = /* @__PURE__ */ new Map();
  const activeLocalIncomingRequests = /* @__PURE__ */ new Map();
  const pendingCoalescedLocalRequests = /* @__PURE__ */ new Map();
  app.get("/api/proxy", async (req, res) => {
    const originalTargetUrl = req.query.url;
    if (!originalTargetUrl) return res.status(400).send("URL required");
    const cacheKey = req.originalUrl;
    const now = Date.now();
    const cachedEntry = proxyLocalCache.get(cacheKey);
    if (cachedEntry && cachedEntry.expiresAt > now) {
      if (cachedEntry.headers["content-type"]) {
        res.setHeader("Content-Type", cachedEntry.headers["content-type"]);
      }
      if (cachedEntry.headers["content-range"]) {
        res.setHeader("Content-Range", cachedEntry.headers["content-range"]);
        res.status(206);
      } else {
        res.status(cachedEntry.statusCode || 200);
      }
      if (cachedEntry.headers["accept-ranges"]) {
        res.setHeader("Accept-Ranges", cachedEntry.headers["accept-ranges"]);
      }
      if (cachedEntry.headers["content-length"]) {
        res.setHeader("Content-Length", cachedEntry.headers["content-length"]);
      }
      res.send(cachedEntry.body);
      return;
    }
    if (activeLocalIncomingRequests.get(cacheKey)) {
      return new Promise((resolve) => {
        if (!pendingCoalescedLocalRequests.has(cacheKey)) {
          pendingCoalescedLocalRequests.set(cacheKey, []);
        }
        pendingCoalescedLocalRequests.get(cacheKey).push((entry) => {
          if (entry.headers["content-type"]) {
            res.setHeader("Content-Type", entry.headers["content-type"]);
          }
          if (entry.headers["content-range"]) {
            res.setHeader("Content-Range", entry.headers["content-range"]);
            res.status(206);
          } else {
            res.status(entry.statusCode || 200);
          }
          if (entry.headers["accept-ranges"]) {
            res.setHeader("Accept-Ranges", entry.headers["accept-ranges"]);
          }
          if (entry.headers["content-length"]) {
            res.setHeader("Content-Length", entry.headers["content-length"]);
          }
          res.send(entry.body);
          resolve();
        });
      });
    }
    activeLocalIncomingRequests.set(cacheKey, true);
    const proxyHost = req.query.proxyHost;
    const proxyPort = req.query.proxyPort;
    const proxyType = req.query.proxyType || "socks5";
    let agent = null;
    if (proxyHost && proxyPort) {
      const proxyUrl = `${proxyType}://${proxyHost}:${proxyPort}`;
      try {
        if (proxyType === "socks5") {
          agent = new import_socks_proxy_agent.SocksProxyAgent(proxyUrl);
        } else if (proxyType === "http") {
          agent = originalTargetUrl.startsWith("https") ? new import_https_proxy_agent.HttpsProxyAgent(proxyUrl) : new import_http_proxy_agent.HttpProxyAgent(proxyUrl);
        }
      } catch (err) {
        console.error("Agent creation failed", err);
      }
    }
    const subdomainsToTry = ["tvsen12", "tvsen14", "tvsen11", "tvsen15", "tvsen5", "tvsen7", "tvsen6", "tvsen13"];
    const tryRequest = (urlStr, depth = 0) => {
      if (depth > 5) return Promise.resolve(null);
      return new Promise((resolve) => {
        let isResolved = false;
        const client = urlStr.startsWith("https") ? import_https.default : import_http.default;
        let targetOrigin = "";
        try {
          const u = new URL(urlStr);
          targetOrigin = u.origin;
        } catch {
        }
        const reqHeaders = {
          "User-Agent": req.query.userAgent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          "Accept": "*/*",
          "Connection": "keep-alive"
        };
        if (req.query.referer) {
          reqHeaders["Referer"] = req.query.referer;
        }
        if (req.headers.range) {
          reqHeaders["Range"] = req.headers.range;
        }
        if (req.headers["accept-language"]) {
          reqHeaders["Accept-Language"] = req.headers["accept-language"];
        }
        const options = {
          agent,
          timeout: 15e3,
          headers: reqHeaders
        };
        const clientReq = client.get(urlStr, options, async (clientRes) => {
          isResolved = true;
          if ([301, 302, 307, 308].includes(clientRes.statusCode || 0) && clientRes.headers.location) {
            let redirectUrl = clientRes.headers.location;
            if (!redirectUrl.startsWith("http")) {
              const u = new URL(urlStr);
              redirectUrl = u.origin + (redirectUrl.startsWith("/") ? "" : "/") + redirectUrl;
            }
            clientRes.destroy();
            const nextResult = await tryRequest(redirectUrl, depth + 1);
            resolve(nextResult);
            return;
          }
          resolve({
            statusCode: clientRes.statusCode || 200,
            headers: clientRes.headers,
            resStream: clientRes,
            finalUrl: urlStr
          });
        });
        const cleanupError2 = () => {
          activeLocalIncomingRequests.delete(cacheKey);
          const resolvePending = pendingCoalescedLocalRequests.get(cacheKey);
          if (resolvePending) {
            resolvePending.forEach((cb) => cb({ body: Buffer.alloc(0), statusCode: 502, headers: {} }));
            pendingCoalescedLocalRequests.delete(cacheKey);
          }
        };
        clientReq.on("timeout", () => {
          if (!isResolved) {
            isResolved = true;
            clientReq.destroy();
            cleanupError2();
            resolve(null);
          }
        });
        clientReq.on("error", (e) => {
          console.error(`Proxy request error for ${urlStr}:`, e.message);
          if (!isResolved) {
            isResolved = true;
            cleanupError2();
            resolve(null);
          }
        });
        setTimeout(() => {
          if (!isResolved) {
            isResolved = true;
            clientReq.destroy();
            cleanupError2();
            resolve(null);
          }
        }, 8e3);
      });
    };
    let targetUrl = originalTargetUrl;
    const isAynaott = targetUrl.includes("aynaott.com");
    const channelKey = getChannelKey(targetUrl);
    if (isAynaott && channelKey) {
      if (resolvedSubdomains[channelKey]) {
        try {
          const u = new URL(targetUrl);
          u.host = resolvedSubdomains[channelKey];
          targetUrl = u.toString();
        } catch {
        }
      }
    }
    let result = await tryRequest(targetUrl);
    if (isAynaott && channelKey && (!result || result.statusCode === 404 || result.statusCode === 403)) {
      if (result && result.resStream) {
        result.resStream.destroy();
      }
      console.log(`Smart proxy adjusting dead subdomain for channel: ${channelKey}`);
      let resolvedUrl = "";
      for (const subdomain of subdomainsToTry) {
        try {
          const u = new URL(originalTargetUrl);
          u.host = `${subdomain}.aynaott.com`;
          const testUrl = u.toString();
          const testResult = await tryRequest(testUrl);
          if (testResult && testResult.statusCode === 200) {
            console.log(`Successfully auto-resolved ${channelKey} to ${subdomain}.aynaott.com`);
            resolvedSubdomains[channelKey] = `${subdomain}.aynaott.com`;
            resolvedUrl = testUrl;
            result = testResult;
            break;
          } else if (testResult && testResult.resStream) {
            testResult.resStream.destroy();
          }
        } catch (err) {
          console.error(`Subdomain ${subdomain} test error:`, err);
        }
      }
      if (resolvedUrl) {
        targetUrl = resolvedUrl;
      }
    }
    if (!result) {
      activeLocalIncomingRequests.delete(cacheKey);
      const resolvePending = pendingCoalescedLocalRequests.get(cacheKey);
      if (resolvePending) {
        resolvePending.forEach((cb) => cb({ body: Buffer.alloc(0), statusCode: 502, headers: {} }));
        pendingCoalescedLocalRequests.delete(cacheKey);
      }
      return res.status(502).send("Error connecting to target stream host");
    }
    const { statusCode, headers, resStream, finalUrl } = result;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Range, Accept-Ranges");
    if (headers["content-type"]) {
      res.setHeader("Content-Type", headers["content-type"]);
    }
    if (headers["content-range"]) {
      res.setHeader("Content-Range", headers["content-range"]);
      res.status(206);
    } else {
      res.status(statusCode || 200);
    }
    if (headers["accept-ranges"]) {
      res.setHeader("Accept-Ranges", headers["accept-ranges"]);
    }
    const isM3u8 = targetUrl.toLowerCase().includes(".m3u8") || headers["content-type"] && (headers["content-type"].includes("mpegurl") || headers["content-type"].includes("x-mpegURL") || headers["content-type"].includes("application/vnd.apple.mpegurl"));
    const userAgentParam = req.query.userAgent ? `&userAgent=${encodeURIComponent(req.query.userAgent)}` : "";
    const refererParam = req.query.referer ? `&referer=${encodeURIComponent(req.query.referer)}` : "";
    const proxyParams = (proxyHost && proxyPort ? `&proxyHost=${proxyHost}&proxyPort=${proxyPort}&proxyType=${proxyType}` : "") + userAgentParam + refererParam;
    const cleanupError = () => {
      activeLocalIncomingRequests.delete(cacheKey);
      const resolvePending = pendingCoalescedLocalRequests.get(cacheKey);
      if (resolvePending) {
        resolvePending.forEach((cb) => cb({ body: Buffer.alloc(0), statusCode: 502, headers: {} }));
        pendingCoalescedLocalRequests.delete(cacheKey);
      }
    };
    resStream.on("error", cleanupError);
    if (isM3u8) {
      let body = "";
      resStream.on("data", (chunk) => body += chunk);
      resStream.on("end", () => {
        const lines = body.split("\n");
        const rewritten = lines.map((line) => {
          let trimmed = line.trim();
          if (!trimmed) return line;
          if (!trimmed.startsWith("#")) {
            let absoluteUrl = trimmed;
            try {
              if (!trimmed.startsWith("http")) {
                const urlObj = new URL(finalUrl);
                const basePath = urlObj.pathname.substring(0, urlObj.pathname.lastIndexOf("/") + 1);
                absoluteUrl = urlObj.origin + basePath + trimmed;
              }
              if (absoluteUrl.includes("/api/proxy?url=")) return line;
              return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}${proxyParams}`;
            } catch (e) {
              return line;
            }
          }
          if (trimmed.startsWith("#EXT-X-")) {
            return line.replace(/URI="([^"]+)"/g, (match, p1) => {
              try {
                let absoluteUrl = p1;
                if (!p1.startsWith("http")) {
                  const urlObj = new URL(finalUrl);
                  const basePath = urlObj.pathname.substring(0, urlObj.pathname.lastIndexOf("/") + 1);
                  absoluteUrl = urlObj.origin + basePath + p1;
                }
                return `URI="/api/proxy?url=${encodeURIComponent(absoluteUrl)}${proxyParams}"`;
              } catch (e) {
                return match;
              }
            });
          }
          return line;
        }).join("\n");
        const cacheVal = {
          body: rewritten,
          statusCode: statusCode || 200,
          headers: {
            "content-type": headers["content-type"] || "application/vnd.apple.mpegurl",
            "content-length": String(Buffer.byteLength(rewritten))
          },
          expiresAt: Date.now() + 3e3
        };
        proxyLocalCache.set(cacheKey, cacheVal);
        activeLocalIncomingRequests.delete(cacheKey);
        const resolvePending = pendingCoalescedLocalRequests.get(cacheKey);
        if (resolvePending) {
          resolvePending.forEach((cb) => cb(cacheVal));
          pendingCoalescedLocalRequests.delete(cacheKey);
        }
        res.send(rewritten);
      });
    } else {
      const chunks = [];
      resStream.on("data", (chunk) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      });
      resStream.on("end", () => {
        const fullBuffer = Buffer.concat(chunks);
        const cacheVal = {
          body: fullBuffer,
          statusCode: statusCode || 200,
          headers: {
            "content-type": headers["content-type"] || "video/mp2t",
            "content-length": String(fullBuffer.length),
            "content-range": headers["content-range"] || "",
            "accept-ranges": headers["accept-ranges"] || "bytes"
          },
          expiresAt: Date.now() + 6e4
        };
        proxyLocalCache.set(cacheKey, cacheVal);
        activeLocalIncomingRequests.delete(cacheKey);
        const resolvePending = pendingCoalescedLocalRequests.get(cacheKey);
        if (resolvePending) {
          resolvePending.forEach((cb) => cb(cacheVal));
          pendingCoalescedLocalRequests.delete(cacheKey);
        }
      });
      if (headers["content-length"]) res.setHeader("Content-Length", headers["content-length"]);
      resStream.pipe(res);
    }
  });
  app.get("/api/image-proxy", (req, res) => {
    const urlStr = req.query.url;
    if (!urlStr) return res.status(400).send("URL required");
    if (!urlStr.startsWith("http")) {
      return res.status(400).send("Invalid URL");
    }
    const client = urlStr.startsWith("https") ? import_https.default : import_http.default;
    const reqProxy = client.get(urlStr, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" }
    }, (proxyRes) => {
      if (proxyRes.statusCode) {
        res.status(proxyRes.statusCode);
      }
      if (proxyRes.headers["content-type"]) {
        res.setHeader("Content-Type", proxyRes.headers["content-type"]);
      }
      res.setHeader("Cache-Control", "public, max-age=86400");
      proxyRes.pipe(res);
    });
    reqProxy.on("error", (err) => {
      console.error("Image proxy error:", err.message);
      res.status(500).send("Error proxying image");
    });
  });
  app.get("/api/search", (req, res) => {
    const query = (req.query.q || "").toLowerCase().trim();
    if (!query) return res.json([]);
    const server1Path = import_path.default.join(process.cwd(), "iptv-master", "server1_streams.json");
    const streamsDir = import_path.default.join(process.cwd(), "iptv-master", "streams");
    try {
      const matched = [];
      const seenUrls = /* @__PURE__ */ new Set();
      if (import_fs.default.existsSync(server1Path)) {
        const server1Data = JSON.parse(import_fs.default.readFileSync(server1Path, "utf-8"));
        Object.keys(server1Data).forEach((countryCode) => {
          if (Array.isArray(server1Data[countryCode])) {
            server1Data[countryCode].forEach((ch) => {
              if (ch.name && ch.name.toLowerCase().includes(query)) {
                const uniqueKey = `${countryCode}_1_${ch.url}`;
                if (!seenUrls.has(uniqueKey)) {
                  seenUrls.add(uniqueKey);
                  matched.push({
                    name: ch.name,
                    url: ch.url,
                    logo: ch.logo || "",
                    source: "1",
                    country: countryCode
                  });
                }
              }
            });
          }
        });
      }
      if (import_fs.default.existsSync(streamsDir)) {
        const files = import_fs.default.readdirSync(streamsDir).filter((f) => f.endsWith(".m3u"));
        for (const file of files) {
          if (matched.length > 200) break;
          const countryCode = file.replace(".m3u", "");
          const filePath = import_path.default.join(streamsDir, file);
          const content = import_fs.default.readFileSync(filePath, "utf-8");
          const lines = content.split("\n");
          let currentItem = {};
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith("#EXTINF:")) {
              const parts = line.split(",");
              currentItem.name = parts.length > 1 ? parts[parts.length - 1].trim() : "Unknown";
              const logoMatch = line.match(/tvg-logo="([^"]+)"/);
              if (logoMatch) currentItem.logo = logoMatch[1];
            } else if (line.startsWith("http")) {
              if (currentItem.name) {
                if (currentItem.name.toLowerCase().includes(query)) {
                  const uniqueKey = `${countryCode}_2_${line}`;
                  if (!seenUrls.has(uniqueKey)) {
                    seenUrls.add(uniqueKey);
                    matched.push({
                      name: currentItem.name,
                      url: line,
                      logo: currentItem.logo || "",
                      source: "2",
                      country: countryCode
                    });
                  }
                }
                currentItem = {};
              }
            }
          }
        }
      }
      const server3List = getServer3Channels();
      server3List.forEach((ch) => {
        if (ch.name.toLowerCase().includes(query)) {
          const uniqueKey = `${ch.country}_3_${ch.url}`;
          if (!seenUrls.has(uniqueKey)) {
            seenUrls.add(uniqueKey);
            matched.push({
              name: ch.name,
              url: ch.url,
              logo: ch.logo || "",
              source: "3",
              country: ch.country
            });
          }
        }
      });
      const server4List = getServer4Channels();
      server4List.forEach((ch) => {
        if (ch.name.toLowerCase().includes(query)) {
          const uniqueKey = `${ch.country}_4_${ch.url}`;
          if (!seenUrls.has(uniqueKey)) {
            seenUrls.add(uniqueKey);
            matched.push({
              name: ch.name,
              url: ch.url,
              logo: ch.logo || "",
              source: "4",
              country: ch.country
            });
          }
        }
      });
      matched.sort((a, b) => {
        const aLower = a.name.toLowerCase();
        const bLower = b.name.toLowerCase();
        const cleanQuery = query.replace(/[^a-z0-9]/g, "");
        const cleanA = aLower.replace(/[^a-z0-9]/g, "");
        const cleanB = bLower.replace(/[^a-z0-9]/g, "");
        const aExact = cleanA.includes(cleanQuery);
        const bExact = cleanB.includes(cleanQuery);
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        const aStarts = aLower.startsWith(query);
        const bStarts = bLower.startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        const aNew = aLower.includes("(new)");
        const bNew = bLower.includes("(new)");
        if (aNew && !bNew) return -1;
        if (!aNew && bNew) return 1;
        return a.name.localeCompare(b.name);
      });
      res.json(matched.slice(0, 120));
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });
  app.get("/api/channels", (req, res) => {
    const streamsDir = import_path.default.join(process.cwd(), "iptv-master", "streams");
    try {
      if (!import_fs.default.existsSync(streamsDir)) {
        return res.json([]);
      }
      const files = import_fs.default.readdirSync(streamsDir).filter((f) => f.endsWith(".m3u"));
      const countries = files.map((f) => f.replace(".m3u", ""));
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });
  app.get("/api/parse-m3u", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing URL" });
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        }
      });
      if (!response.ok) throw new Error("Failed to fetch M3U playlist");
      const content = await response.text();
      const firstLine = content.split("\n")[0] || "";
      const epgMatch = firstLine.match(/x-tvg-url="([^"]+)"/) || firstLine.match(/url-tvg="([^"]+)"/);
      if (epgMatch) {
        res.setHeader("Access-Control-Expose-Headers", "X-Tvg-Url");
        res.setHeader("X-Tvg-Url", epgMatch[1]);
      }
      const lines = content.split("\n");
      const channels = [];
      let currentItem = {};
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith("#EXTINF:")) {
          const nameMatch = line.match(/,(.+)$/);
          currentItem.name = nameMatch ? nameMatch[1].trim() : "Unknown";
          const logoMatch = line.match(/tvg-logo="([^"]+)"/);
          if (logoMatch) currentItem.logo = logoMatch[1];
        } else if (line.startsWith("http")) {
          if (currentItem.name) {
            channels.push({
              name: currentItem.name,
              url: line,
              logo: currentItem.logo || "",
              country: "custom"
            });
            currentItem = {};
          } else {
            const urlParts = line.split("/");
            const fileName = urlParts[urlParts.length - 1] || "Stream";
            channels.push({
              name: fileName,
              url: line,
              logo: "",
              country: "custom"
            });
          }
        }
      }
      res.json(channels);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });
  app.get("/api/test-link", async (req, res) => {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6e3);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          "Accept": "*/*"
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const contentType = response.headers.get("content-type") || "unknown";
      const isM3U = contentType.includes("mpegurl") || contentType.includes("mpegURL") || url.toLowerCase().includes(".m3u");
      const isStream = contentType.includes("video") || contentType.includes("audio") || contentType.includes("mpegurl") || contentType.includes("octet-stream") || url.toLowerCase().includes(".m3u8") || url.toLowerCase().includes(".ts") || url.toLowerCase().includes(".mp4");
      res.json({
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        contentType,
        isM3U,
        isStream,
        message: response.ok ? "Link is reachable and online!" : `Reachable but returned status ${response.status} (${response.statusText})`
      });
    } catch (err) {
      console.error(`Link test error for ${url}:`, err);
      let errorMsg = err.message || String(err);
      if (err.name === "AbortError") {
        errorMsg = "Request timed out (server took too long to respond)";
      }
      res.json({
        ok: false,
        status: 0,
        error: errorMsg,
        message: `Failed to connect: ${errorMsg}`
      });
    }
  });
  app.get("/api/channels/:country", (req, res) => {
    const country = req.params.country;
    if (country === "fifa") {
      const staticPath = import_path.default.join(process.cwd(), "public", "static-api", "fifa.json");
      if (import_fs.default.existsSync(staticPath)) {
        const staticData = JSON.parse(import_fs.default.readFileSync(staticPath, "utf-8"));
        return res.json(staticData);
      }
      return res.json([]);
    }
    if (country === "sports") {
      const staticPath = import_path.default.join(process.cwd(), "public", "static-api", "sports.json");
      if (import_fs.default.existsSync(staticPath)) {
        const staticData = JSON.parse(import_fs.default.readFileSync(staticPath, "utf-8"));
        return res.json(staticData);
      }
    }
    const filePath = import_path.default.join(process.cwd(), "iptv-master", "streams", `${country}.m3u`);
    const server1Path = import_path.default.join(process.cwd(), "iptv-master", "server1_streams.json");
    try {
      let channels = [];
      if (import_fs.default.existsSync(server1Path)) {
        const server1Data = JSON.parse(import_fs.default.readFileSync(server1Path, "utf-8"));
        if (server1Data[country]) {
          server1Data[country].forEach((ch) => {
            channels.push({
              name: ch.name,
              url: ch.url,
              logo: ch.logo || "",
              source: "1",
              country
            });
          });
        }
      }
      if (country !== "fifa" && country !== "sports") {
        if (import_fs.default.existsSync(filePath)) {
          const content = import_fs.default.readFileSync(filePath, "utf-8");
          const lines = content.split("\n");
          let currentItem = {};
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith("#EXTINF:")) {
              const parts = line.split(",");
              currentItem.name = parts.length > 1 ? parts[parts.length - 1].trim() : "Unknown";
              const logoMatch = line.match(/tvg-logo="([^"]+)"/);
              if (logoMatch) currentItem.logo = logoMatch[1];
            } else if (line.startsWith("http")) {
              if (currentItem.name) {
                channels.push({
                  name: currentItem.name,
                  url: line,
                  logo: currentItem.logo || "",
                  source: "2",
                  country
                });
                currentItem = {};
              }
            }
          }
        }
      }
      const server3List = getServer3Channels();
      const server4List = getServer4Channels();
      if (country === "fifa") {
        const server3Fifa = server3List.filter((ch) => {
          const nameLc = ch.name.toLowerCase();
          return nameLc.includes("fifa") || nameLc.includes("world cup") || nameLc.includes("fwc") || nameLc.includes("bein sports 1");
        });
        const server4Fifa = server4List.filter((ch) => {
          const nameLc = ch.name.toLowerCase();
          return nameLc.includes("fifa") || nameLc.includes("world cup") || nameLc.includes("fwc") || nameLc.includes("bein sports 1");
        });
        channels = channels.concat(server3Fifa).concat(server4Fifa);
        channels.sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          const aBein = aName.includes("bein sports 1");
          const bBein = bName.includes("bein sports 1");
          if (aBein && !bBein) return -1;
          if (!aBein && bBein) return 1;
          const aTS = (a.source === "3" || a.source === "4") && (aName.includes("t sports") || aName.includes("tsports"));
          const bTS = (b.source === "3" || b.source === "4") && (bName.includes("t sports") || bName.includes("tsports"));
          if (aTS && !bTS) return -1;
          if (!aTS && bTS) return 1;
          return 0;
        });
      } else if (country === "sports") {
        const server3Sports = server3List.filter((ch) => {
          const nameLc = ch.name.toLowerCase();
          const urlLc = ch.url.toLowerCase();
          return nameLc.includes("sports") || nameLc.includes("sport") || nameLc.includes("dazn") || nameLc.includes("football") || nameLc.includes("cup") || nameLc.includes("star sports") || nameLc.includes("sony sports") || nameLc.includes("ptv sports") || nameLc.includes("criclife") || nameLc.includes("fancode") || nameLc.includes("t sports") || urlLc.includes("tsports") || nameLc.includes("fs1") || nameLc.includes("fuel tv");
        });
        const server4Sports = server4List.filter((ch) => {
          const nameLc = ch.name.toLowerCase();
          const urlLc = ch.url.toLowerCase();
          return nameLc.includes("sports") || nameLc.includes("sport") || nameLc.includes("dazn") || nameLc.includes("football") || nameLc.includes("cup") || nameLc.includes("star sports") || nameLc.includes("sony sports") || nameLc.includes("ptv sports") || nameLc.includes("criclife") || nameLc.includes("fancode") || nameLc.includes("t sports") || urlLc.includes("tsports") || nameLc.includes("fs1") || nameLc.includes("fuel tv");
        });
        channels = channels.concat(server3Sports).concat(server4Sports);
      } else {
        const server3Country = server3List.filter((ch) => ch.country === country);
        const server4Country = server4List.filter((ch) => ch.country === country);
        channels = channels.concat(server3Country).concat(server4Country);
      }
      res.json(channels);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
