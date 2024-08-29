###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
RUN npm install
RUN npm run build
ENV NODE_ENV production
RUN npm install --only=production
# Cleanup dev dependencies
RUN npm prune --production
USER node

###################
# PRODUCTION
###################
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
CMD [ "node", "dist/main.js" ]