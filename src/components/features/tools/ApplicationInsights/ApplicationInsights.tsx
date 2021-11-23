import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import dynamic from 'next/dynamic';
import { createContext, useContext, useState, PropsWithChildren, useMemo } from 'react';

/* ===========================================================================
 * Dynamically import AppInsights it's SDK as it's huge
 * =========================================================================== */

const ApplicationInsightsSdk = dynamic(() => import('./ApplicationInsightsSdk'), {
  ssr: false,
});

const AppInsightsContext = createContext<{ instance?: ApplicationInsights }>({});

/* ===========================================================================
 * useApplicationInsights hook which returns the 'instance' property in order to track specific events
 * =========================================================================== */

const useApplicationInsights = () => {
  const context = useContext(AppInsightsContext);
  if (context === undefined) {
    throw new Error('useApplicationInsights must be used within a AppInsightsProvider');
  }
  return context;
};

/* ===========================================================================
 * Context provider with memoized instance of ApplicationInsights
 * =========================================================================== */

const AppInsightsProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { NEXT_PUBLIC_APPINSIGHTS_INSTRUMENTATIONKEY } = process.env;

  const [instance, setInstance] = useState<ApplicationInsights>();

  /** Memoize instance */
  const context = useMemo(
    () => ({
      instance,
    }),
    [instance],
  );

  return (
    <AppInsightsContext.Provider value={context}>
      {NEXT_PUBLIC_APPINSIGHTS_INSTRUMENTATIONKEY && (
        <ApplicationInsightsSdk
          instrumentationKey={NEXT_PUBLIC_APPINSIGHTS_INSTRUMENTATIONKEY}
          instance={instance}
          setInstance={setInstance}
        />
      )}
      {children}
    </AppInsightsContext.Provider>
  );
};

export { AppInsightsProvider, useApplicationInsights };
