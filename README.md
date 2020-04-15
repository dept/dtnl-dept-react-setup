# Dept React Setup

## Initialize the project

- Copy `.env.example` to `.env` and fill in the required variables
- Run `yarn` to install the dependencies

## To start the server

- Run `yarn dev` to start the dev server
- Run `yarn build && yarn start` to start the production server

## To deploy and build this project on a test environment or production server using a CI tool

- Run `yarn build` to make a production build
- Run `rm -rf node_modules` to remove devDependencies
- Run `yarn --prod` to build only production dependencies
- Create `web.config` file in the root where you fill in a bunch or stuff and run node index.js:

```
<handlers>
    <add name=“iisnode” path=“index.js” verb=“*” modules=“iisnode”/>
</handler
```

- For questions: wesley.ronda@deptagency.com

## Next.js

This project uses next.js to achieve server side rendering ([https://nextjs.org/docs](https://nextjs.org/docs)). Some of the major differences with client side react applications are _routing_ and _server side data fetching_. Also you have to take in to account that you cannot use browser api on the server. To use browser api you need to wrap them in a condition. For example

```javascript
if (process.browser) {
  window.addEventListener(fn)
}
```

## Generator

The project includes generators for components en context provider. Simply run either:

- `yarn generate page about`
- `yarn generate component Slider`
- `yarn generate context User`

## Generate icons from svg

Place all your icons in `/public/icons`. Run `yarn svgr`. This generates jsx components from your svg's and optimizes them with SVGO. SVGO config is located in the root of the project. The CamelCased filename will be the name of the icon.

Example:

calendar.svg -> Calendar.tsx

Usage:

`<Icon icon="Calendar" color="magenta" />`

## Generate favicons / app icons

To generate the favicons:

- Overwrite `/public/logo.png`. Make sure the resolution is as big as possible.
- Define the configuration in `/config/favicons.js`
- Run `yarn favicons`
- The meta tags are automatically inserted in `_documents.tsx`

### Routing

To create a new route add a new page to the `./pages` folder. You can easily create a new page by running `yarn generate page name-of-the-page`. Your newly created page will server from `http://localhost:3000/name-of-the-page`. Because the filename will be the same as the slug name has to be in kebab-case [http://wiki.c2.com/?KebabCase](http://wiki.c2.com/?KebabCase). If you need the page to be dynamic, create a page with brackets. For example: `product/[productId].tsx`. `http://localhost:3000/product/100` will serve the page with `{ productId: '100' }` in its `ctx.query` object. More info [https://github.com/zeit/next.js#dynamic-routing](https://github.com/zeit/next.js#dynamic-routing)

1. Create new page with `yarn generate page about`
2. Serve the page from `http://localhost:3000/about`

## Typescript

This project is written to typescript. If you aren't that familiar with typescript this [cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet) is a great resource to get familiar.

## Opt out of Server Side Rendering

If you would like to create a static website and opt out of SSR thats also possible. Make sure non of your pages use the `getInitialProps` or the `getServerSideProps` functions. Also make sure you dont have any api routes (routes in the `/api` folder), because they will not work without the server. Run `yarn build` && `yarn export`. This will generate the `out` folder, which includes all the static files. Upload the out folder to your server and make sure all traffic is pointed to `index.html`. Check out the documentation for `exportPathMap` ([https://nextjs.org/docs/api-reference/next.config.js/exportPathMap](https://nextjs.org/docs/api-reference/next.config.js/exportPathMap)) for static pages and `getStaticProps` for dynamic pages ([https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)).

To test:

1. Go to the `out` folder `cd out`
2. Run a http server `npx http-server`

## Documentation

Documentation for this project is present in storybook. Run `yarn storybook` to start up the documentation.

## Design system

This project uses [styled-components](https://www.styled-components.com/) and [styled-system](https://github.com/styled-system/styled-system) to create the ui library, but using _css_, _css modules_ and _sass_ are still supported.

## Atomic design structure

The component archicture is set up following the atomic design methodology.

![Atomic Design](http://atomicdesign.bradfrost.com/images/content/atomic-design-molecules.png)
