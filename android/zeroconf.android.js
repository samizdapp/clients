const { withAndroidManifest } = require("@expo/config-plugins")

module.exports = function androidManifestPlugin(config) {
  return withAndroidManifest(config, async config => {
    let androidManifest = config.modResults.manifest

    // add remove property to the audio record permission
    androidManifest["uses-permission"] = androidManifest["uses-permission"].concat([
        {
            $:{
                "android:name" : "android.permission.ACCESS_NETWORK_STATE"
            }
        },{
            $:{
                "android:name" : "android.permission.ACCESS_WIFI_STATE"
            }
        },{
            $:{
                "android:name" : "android.permission.CHANGE_WIFI_MULTICAST_STATE"
            }
        },{
            $:{
                "android:name" : "android.permission.INTERNET"
            }
        }
    ])

    return config
  })
}