FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY backend/package.json backend/package.json
RUN npm install --workspace backend

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY backend ./backend
WORKDIR /app/backend
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/backend/package.json ./package.json
COPY --from=build /app/backend/dist ./dist
COPY --from=deps /app/backend/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/server.js"]
