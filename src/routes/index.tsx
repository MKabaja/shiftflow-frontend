import {createRoute} from '@tanstack/react-router';
import {Route} from './__root.tsx';

export const indexRoute = createRoute({
  getParentRoute: () => Route,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h1>WELCOME from SHIFTFLOW</h1>
      </div>
    );
  },
});
