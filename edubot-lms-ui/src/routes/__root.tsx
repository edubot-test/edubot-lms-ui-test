import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import BaseEdubotHeader from '@/components/custom/base/BaseEdubotHeader';
import BaseEdubotSidebar from '@/components/custom/base/BaseEdubotSidebar';
 
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

// function RootComponent() {
//   return (
//     <>
//       <div className="tw-p-2 tw-flex tw-gap-2">
//         <Link to="/" className="[&.active]:tw-font-bold">
//           Home
//         </Link>{' '}
//         <Link to="/about" className="[&.active]:tw-font-bold">
//           About
//         </Link>
//       </div>
//       <hr />
//       <Outlet />
//       <ReactQueryDevtools buttonPosition="top-right" />
//       <TanStackRouterDevtools position="bottom-right" />
//     </>
//   );
// } 

function RootComponent() {
  return (
    <div className="tw-font-montserrat tw-flex tw-flex-col tw-h-screen">
      <BaseEdubotHeader />
      <div className="tw-flex tw-flex-1 tw-overflow-hidden">
        <BaseEdubotSidebar />
        <main className="tw-flex-1 tw-overflow-auto tw-p-6">
          <Outlet />
        </main>
      </div>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}