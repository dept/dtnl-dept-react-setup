import { BoxProps } from '@/components/atoms/Grid';

export const styledSystemVariants = <T>(et: { [K in keyof T]: BoxProps['sx'] }) => et;
