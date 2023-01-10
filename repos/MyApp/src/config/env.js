import Constants from "expo-constants";
const ENV = {
  dev: {
    apiUrl: "https://terafac.feignbird.live/",
    amplitudeKey: "",
    androidClientId:
      "",
    iosClientId:
      "",
    facebookAppId: "",
    googleKey: ""
  },
  prod: {
    apiUrl: "https://terafac.feignbird.live/",
    amplitudeKey: "",
    androidStandaloneAppClientId:
      "",
    iosStandaloneAppClientId:
      "", 
    androidClientId:
      "",
    iosClientId:
      "",
    facebookAppId: "",
    googleKey: ""
  }
};
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "prod") {
    return ENV.prod;
  }
};
export default getEnvVars;