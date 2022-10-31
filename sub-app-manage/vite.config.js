import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { resolve } from "path";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  return {
    // 插件配置
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: "src/assets/quasar-variables.sass",
      }),
    ],
    // 解析配置
    resolve: {
      // 路径别名
      alias: {
        //  例如： @/abc => src/abc
        "@": resolve(__dirname, "src"),
      },
    },
    // 服务端配置
    server: {
      proxy: {
        //   //这里是通过请求/api 来转发到 https://api.***.com/
        //   //假如你要请求https://api.***.com/a/a
        //   //那么axios的url，可以配置为 /api/a/a
        "/api": {
          target: "http://www.***.com",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
      // 读取环境变量中的HOST、PORT
      host: env["VITE_HOST"],
      port: env["VITE_PORT"],
      strictPort: true,
      // 是否自动浏览器打开
      // open: true,
    },
  };
};
