import { FormApi } from 'final-form';

export type FinalFormSubmitHandler<T> = (values: T, helpers: FormApi<T>) => void;
