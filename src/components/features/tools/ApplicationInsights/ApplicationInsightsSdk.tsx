import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { useEffect } from 'react';

type ApplicationInsightsSDKProps = {
  instance?: ApplicationInsights;
  setInstance: (instance?: ApplicationInsights) => void;
  instrumentationKey?: string;
};

/* ===========================================================================
 * dynamically loadable SDK component that only creates an AppInsights instance if the key is provided
 * =========================================================================== */

export default function AppInsightsSdk({
  instrumentationKey,
  instance,
  setInstance,
}: ApplicationInsightsSDKProps) {
  useEffect(() => {
    /** Return in case instnace exists or key is not provided */
    if (instance || !instrumentationKey) return;

    /** initialize AppInsights */
    const appInsights = new ApplicationInsights({
      config: {
        instrumentationKey,
        enableAutoRouteTracking: true,
      },
    });

    appInsights.loadAppInsights();
    appInsights.trackPageView();

    setInstance(appInsights);
  }, [instance, instrumentationKey, setInstance]);

  return null;
}
