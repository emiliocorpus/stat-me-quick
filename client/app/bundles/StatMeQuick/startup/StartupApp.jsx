import React from 'react';
import ReactOnRails from 'react-on-rails';

import StartupContainer from '../containers/StartupContainer';

const StartupApp = (props) => (
  <StartupContainer {...props} />
);

// This is how react_on_rails can see the HelloWorldApp in the browser.
ReactOnRails.register({ StartupApp });
