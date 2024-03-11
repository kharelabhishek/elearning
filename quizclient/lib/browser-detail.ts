const userAgent = navigator.userAgent;
const platform = navigator?.userAgentData?.platform || navigator?.platform || 'unknown';
const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);
const deviceId = `${randomString}`;
// const deviceId = `${userAgent}-${platform}-${randomString}`;
const timezone = new Date().getTimezoneOffset();
const language = "en";

export {platform, deviceId, timezone, language}