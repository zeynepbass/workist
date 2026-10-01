FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS development
RUN npm ci
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]

FROM base AS production
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force
COPY . .
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:4000/health || exit 1
CMD ["sh", "-c", "npx migrate-mongo up && node index.js"]
