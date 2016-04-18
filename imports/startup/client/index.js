import { mount } from 'react-mounter';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Routes } from './routes.js';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
mount(Routes);
