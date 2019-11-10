import React from 'react'

import { Hyperlink } from '.'

export default { title: 'Atoms|Hyperlink', component: Hyperlink }

export const example = () => <Hyperlink>Go to a page</Hyperlink>
export const withUnderline = () => <Hyperlink underline>Go to a page</Hyperlink>
export const withIcon = () => <Hyperlink icon="clock">Go to a page</Hyperlink>
