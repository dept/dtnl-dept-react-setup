# ---- Base Node ----
FROM node:14-alpine as base
# set working directory
WORKDIR /usr/src/app
# Copy package and lockfile
COPY package.json ./
COPY yarn.lock ./

# ---- Dependencies ----
# Install python as needed by node-gyp and alpine doesn't include this
RUN apk add --no-cache --virtual .gyp \
        python2 \
        make \
        g++ \
    && npm install \
    && apk del .gyp

FROM base as dependencies
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
# enable run as production
ENV NODE_ENV=production
# start app
CMD ["yarn", "start"]
