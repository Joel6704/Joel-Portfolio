import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url === '/api/contact') {
          if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            res.statusCode = 200
            res.end()
            return
          }
          if (req.method === 'POST') {
            let bodyText = ''
            req.on('data', chunk => {
              bodyText += chunk
            })
            req.on('end', async () => {
              try {
                let parsedBody = {}
                try {
                  parsedBody = bodyText ? JSON.parse(bodyText) : {}
                } catch {
                  parsedBody = {}
                }
                const mockReq = {
                  method: 'POST',
                  body: parsedBody,
                  headers: req.headers,
                  socket: req.socket,
                }
                const mockRes = {
                  statusCode: 200,
                  headers: {} as Record<string, string>,
                  setHeader(k: string, v: string) {
                    this.headers[k] = v
                    res.setHeader(k, v)
                  },
                  status(code: number) {
                    this.statusCode = code
                    res.statusCode = code
                    return this
                  },
                  json(data: any) {
                    res.statusCode = this.statusCode
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(data))
                  },
                  end(data?: any) {
                    res.end(data)
                  },
                }

                const mod = await server.ssrLoadModule('/api/contact.ts')
                await mod.default(mockReq, mockRes)
              } catch (err: any) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: false, error: err?.message || 'Dev server error' }))
              }
            })
            return
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevPlugin()],
})
