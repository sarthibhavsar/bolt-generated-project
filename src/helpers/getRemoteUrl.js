export function getRemoteUrl(moduleName, env) {
  // console.log(env, "env in getRemoteUrl");
  const baseUrl = env.VITE_REMOTE_BASE_URL || "http://localhost:5000";
  console.log(env.VITE_REMOTE_BASE_URL, "baseUrl in getRemoteUrl");
  console.log(baseUrl);
  const modulePort = {
    config: "5002",
    ballooning: "5003",
    inspection: "5004",
  };
  console.log(modulePort);
  console.log(env.VITE_NODE_ENV, "env.NODE_ENV in getRemoteUrl");
  if (env.VITE_NODE_ENV === "development") {
    console.log("development");
    return `http://localhost:${modulePort[moduleName]}/assets/remoteEntry.js`;
  }

  return `${baseUrl}/${moduleName}ui/assets/remoteEntry.js`;
}
