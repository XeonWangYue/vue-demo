import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    if (command !== "build") {
        return {
            base: "./",
            plugins: [vue(), AutoImport({
                dts: true,
                imports: [
                    'vue'
                ]
            })],
            resolve: {
                alias: {"@": resolve(__dirname, "src")}
            },
            server: {
                host: "127.0.0.1",
                port: 30002,
                proxy: {
                    // "/api-test/find"
                    // "http://localhost:8087/find"
                    "/api-test": {
                        target: "http://localhost:8087",
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api-test/, ""),
                    },
                    "/api-file": {
                        target: "http://42.192.203.132:8083",
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api-file/, ""),
                    },
                    "/office": {
                        target: "http://192.168.140.2:8082",
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/office/, ""),
                    },
                }
            }
        }
    } else {
        return {
            base: "./",
            plugins: [vue()],
            resolve: {
                alias: {"@": resolve(__dirname, "src")}
            }
        }
    }
})
