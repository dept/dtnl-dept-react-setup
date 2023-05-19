# ---- Pruned sources for frontend ----
FROM node:18-alpine AS source
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn set version 3.3.1

# Copy in the most cachable way
COPY ./package.json .
COPY ./.yarn/releases .yarn/releases
COPY ./.yarn/plugins .yarn/plugins
COPY ./yarn.lock .
COPY ./.yarnrc.yml .
COPY ./packages ./packages
COPY ./apps ./apps
COPY ./turbo.json .

# install required dependencies
RUN yarn plugin import workspace-tools
RUN CI=1 yarn workspaces focus @dept/platform @dept/web

# generate pruned source
RUN yarn turbo prune --scope="@dept/web" --docker

# Inspired by: https://nextjs.org/docs/deployment#docker-image
# ---- Base Node ----
FROM node:18-alpine as dependencies
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn set version 3.3.1

# Copy package and lockfile
COPY --from=source /app/out/full/ .
COPY ./.yarn/releases .yarn/releases
COPY ./.yarn/plugins .yarn/plugins
# The pruned lockfile does not seem to be complete for use in the next step, use the local lockfile
COPY ./yarn.lock .
COPY ./.yarnrc.yml .

# install dependencies
RUN yarn plugin import workspace-tools
RUN CI=1 yarn workspaces focus @dept/platform @dept/web

# ---- Build ----
FROM node:18-alpine AS build
RUN apk add --no-cache libc6-compat
RUN apk update

# Declare args
ARG NEXT_PUBLIC_APP_URL

# Asign args to env
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL


WORKDIR /app
RUN yarn set version 3.3.1

# copy pruned source and project dependencies from dependencies step
COPY --from=dependencies /app/ .
COPY ./yarn.lock ./.yarnrc.yml ./

# build project
RUN yarn turbo run build --filter="@dept/web"

# purge all non essential dependencies
RUN yarn plugin import workspace-tools
RUN CI=1 yarn workspaces focus --production @dept/web

# ---- Release ----
FROM node:18-alpine as release

WORKDIR /app
RUN yarn set version 3.3.1

# Declare args
ARG NEXT_PUBLIC_APP_URL

# Assign args to env
ENV NEXT_PUBLIC_APP_UR=$NEXT_PUBLIC_APP_URL

# Enable run as production
ENV NODE_ENV=production
# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# create custom group and user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# add curl for container health check
RUN apk --no-cache add curl

# copy build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages

WORKDIR /app

# make sure to add all your custom folders/files that you need on runtime here
COPY --from=build /app/apps/web/public ./public
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next ./.next
COPY --from=build /app/apps/web/package.json ./package.json
COPY --from=build /app/apps/web/node_modules ./node_modules
COPY --from=build /app/apps/web/next.config.mjs ./
COPY --from=build /app/apps/web/i18n.js ./i18n.js
COPY --from=build /app/apps/web/tsconfig.json ./tsconfig.json
COPY --from=build /app/apps/web/config ./config
COPY --from=build /app/apps/web/locales ./locales
COPY --from=build /app/apps/web/src/pages ./pages
COPY --from=build /app/apps/web/sentry.properties ./sentry.properties
COPY --from=build /app/apps/web/sentry.client.config.js ./sentry.client.config.js
COPY --from=build /app/apps/web/sentry.server.config.js ./sentry.server.config.js

# dont run as root
USER nextjs

# expose and set port number to 3000
EXPOSE 3000
ENV PORT 3000

# start app
CMD ["../../node_modules/.bin/next", "start"]

