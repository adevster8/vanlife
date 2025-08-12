module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // includes expo-router in SDK 50
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: { "@": "./app" },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
        }
      ],
      "react-native-reanimated/plugin" // keep LAST
    ]
  };
};