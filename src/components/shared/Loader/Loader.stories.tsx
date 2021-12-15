import { Loader } from './Loader';
import { LoadingBar } from './LoadingBar';
import { Spinner } from './Spinner';

export default { title: 'Atoms/Loader', component: Loader };

export const example = () => <Loader isAnimating withLogo isFullScreen />;

export const loadingBar = () => <LoadingBar duration={200} progress={50} />;

export const circular = () => <Spinner />;
