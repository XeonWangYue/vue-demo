import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    if (command !== "build") {
        return {
            base: "./",
            plugins: [vue()],
            resolve: {
                alias: {"@": resolve(__dirname, "src")}
            },
            server: {
                host: "127.0.0.1",
                port: 30002,
                proxy: {
                    "/api-test": {
                        target: "http://localhost:8087",
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api-test/, ""),
                    }
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
