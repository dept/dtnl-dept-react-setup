import { splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const buttonFn = /* @__PURE__ */ createRecipe('button', {
  "visual": "funky",
  "size": "sm",
  "shape": "square",
  "fullWidth": false
}, [])

const buttonVariantMap = {
  "visual": [
    "funky"
  ],
  "size": [
    "sm",
    "lg"
  ],
  "shape": [
    "square",
    "circle"
  ],
  "fullWidth": [
    "true"
  ]
}

const buttonVariantKeys = Object.keys(buttonVariantMap)

export const button = /* @__PURE__ */ Object.assign(buttonFn, {
  __recipe__: true,
  __name__: 'button',
  raw: (props) => props,
  variantKeys: buttonVariantKeys,
  variantMap: buttonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, buttonVariantKeys)
  },
})