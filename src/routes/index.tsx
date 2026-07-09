import { createRoute } from '@tanstack/react-router';
import { Route } from './__root.tsx';

export const indexRoute = createRoute({
  getParentRoute: () => Route,
  path: '/',
  component: () => <h1>SHIFTFlow</h1>,
});
