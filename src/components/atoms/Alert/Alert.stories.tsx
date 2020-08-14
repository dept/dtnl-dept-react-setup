import React from 'react';

import { Alert } from '.';

export default { title: 'Atoms/Alert', component: Alert };

export const withSuccess = () => <Alert type="succes">Succes alert</Alert>;
export const withWarning = () => <Alert type="warning">Succes warning</Alert>;
export const withNeutral = () => <Alert type="neutral">Succes neutral</Alert>;
