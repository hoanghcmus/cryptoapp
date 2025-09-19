const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname)
const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'), // Exclude svg from assetExts
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'], // Add svg to sourceExts
    },
};

module.exports = withNativeWind(mergeConfig(defaultConfig, config), { input: './global.css' })

