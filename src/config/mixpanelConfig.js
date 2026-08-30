import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN;
const MIXPANEL_API_HOST = process.env.REACT_APP_MIXPANEL_API_HOST || 'https://api.mixpanel.com';
const isConfigured = Boolean(MIXPANEL_TOKEN) && MIXPANEL_TOKEN !== 'YOUR_MIXPANEL_TOKEN_HERE';

if (isConfigured) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: false,
    track_pageview: false,
    persistence: 'localStorage',
    api_host: MIXPANEL_API_HOST
  });
} else {
  console.warn('Mixpanel token is missing or still using the placeholder value. Add REACT_APP_MIXPANEL_TOKEN to your .env file and restart the dev server.');
}

const safeMixpanel = {
  ...mixpanel,
  track: (...args) => {
    if (!isConfigured) return;
    return mixpanel.track(...args);
  },
  identify: (...args) => {
    if (!isConfigured) return;
    return mixpanel.identify(...args);
  },
  alias: (...args) => {
    if (!isConfigured) return;
    return mixpanel.alias(...args);
  },
  reset: (...args) => {
    if (!isConfigured) return;
    return mixpanel.reset(...args);
  }
};

export default safeMixpanel;
