import { Alert } from './Alert';

export default { title: 'Atoms/Alert', component: Alert };

export const withSuccess = () => <Alert type="success">Alert success</Alert>;
export const withWarning = () => <Alert type="warning">Alert warning</Alert>;
export const withInfo = () => <Alert type="info">Alert neutral</Alert>;
export const withError = () => <Alert type="error">Alert error</Alert>;
