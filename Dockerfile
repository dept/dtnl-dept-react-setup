
# Inspired by: https://nextjs.org/docs/deployment#docker-image
# ---- Base Node ----
FROM node:16-alpine as base
# set working directory
WORKDIR /usr/src/app
# Copy package and lockfile
COPY package.json ./
COPY yarn.lock ./

# ---- Dependencies ----
FROM base as dependencies
# Install build dependencies that are missing in the alpine image
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat \
                       alpine-sdk \
                       python3
RUN apk add --no-cache vips-dev

# install dependencies
RUN yarn --frozen-lockfile --prod
COPY . .

# ---- Build ----
FROM dependencies as build
# install all dependencies
RUN yarn --frozen-lockfile
# build project
RUN yarn build

# ---- Release ----
FROM dependencies as release
# copy build
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

# dont run as root
USER node

# expose and set port number to 3000
EXPOSE 3000
ENV PORT 3000

# enable run as production
ENV NODE_ENV=production

# start app
CMD ["yarn", "start"]
