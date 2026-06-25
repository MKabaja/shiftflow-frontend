import { createRoute } from '@tanstack/react-router';
import { Route } from './__root.tsx';
import { hashColor } from '@/shared/lib/hashColor.ts';

export const indexRoute = createRoute({
  getParentRoute: () => Route,
  path: '/',
  component: function Index() {
    console.log(hashColor(''));
    return (
      <div className="p-2">
        <h1>WELCOME from SHIFTFLOW</h1>
      </div>
    );
  },
});
