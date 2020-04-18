# ---- Base Node ----
FROM node:lts-alpine as base
# set working directory
WORKDIR /usr/src/app
# Copy package and lockfile
COPY package.json ./
COPY yarn.lock ./

# ---- Dependencies ----
FROM base AS dependencies
RUN yarn --frozen-lockfile --prod \
    && cp -R node_modules prod_node_modules \
    && yarn --frozen-lockfile
COPY . .
RUN yarn build

FROM base AS release
# copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
# Bundle required app source
COPY --from=dependencies /usr/src/app/.next ./.next
COPY --from=dependencies /usr/src/app/config ./config
COPY --from=dependencies /usr/src/app/public ./public
COPY --from=dependencies /usr/src/app/package.json ./
COPY --from=dependencies /usr/src/app/next.config.js ./
COPY --from=dependencies /usr/src/app/.env* ./
# dont run as root
USER node
# Start server
CMD ["yarn", "start"]
