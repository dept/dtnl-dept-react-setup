import dot from 'dot-object';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import scrollToElement from 'scroll-to-element';

const duration = 500;

export const FormikScrollToErrors: React.FC = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext();

  useEffect(() => {
    let timeout: any;

    const shouldScrollToError = isSubmitting && !isValidating;

    if (shouldScrollToError) {
      const flattenErrors = dot.dot(errors);
      const keys = Object.keys(flattenErrors);

      if (keys.length > 0) {
        const element = document.querySelector<HTMLInputElement>(`[name="${keys[0]}"]`);

        if (element) {
          scrollToElement(element, {
            duration,
            offset: 0,
            ease: 'linear',
          });

          timeout = setTimeout(() => element.focus(), duration + 200);
        }
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [errors, isSubmitting, isValidating]);

  return null;
};
