import { BoxProps } from '@/components/shared/Grid';

export const styledSystemVariants = <T>(et: { [K in keyof T]: BoxProps['sx'] }) => et;
