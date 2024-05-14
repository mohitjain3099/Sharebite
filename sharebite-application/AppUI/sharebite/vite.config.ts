import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import dotenv from "dotenv";
dotenv.config();
//defineConfig function to configure the Vite app
export default defineConfig({
  //base path for the app
  server: {
    port: 3002,
  },
  //List of plugins used in the app
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies:'generateSW',
      devOptions: {
        enabled: true,
      },
      //PWA configuration
      manifest: {
        "name": "ShareBite",
        "short_name": "CourseRegist",
        "start_url": "./",
        "display": "standalone",
        "background_color": "#fff",
        "description": "Food Sharing and Donation App",
        "theme_color": "#ffffff",
        "icons": [
          {
            "src": "public/images/pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "public/images/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "public/images/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "public/images/maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      },
      //Workbox configuration
      workbox:{
        runtimeCaching:[
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes('/')
            },
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'post-data-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes('/')
            },
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'post-data-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes('getALlEventData')
            },
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'event-data-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          }
        ]
      }
  })],
})
