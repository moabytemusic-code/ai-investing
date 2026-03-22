import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { HomePage } from './pages/HomePage';
import { AffiliatePage } from './pages/AffiliatePage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ProfilePage } from './pages/ProfilePage';
import { LegalPage } from './pages/LegalPage';
import FreeGuide from './pages/FreeGuide';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LeadMagnetModal } from './components/modals/LeadMagnetModal';
import { Toaster } from 'sonner';

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <LeadMagnetModal />
      <Toaster position="top-right" richColors theme="dark" />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const affiliateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recommendations',
  component: AffiliatePage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$slug',
  component: BlogPostPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});

const guideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guide',
  component: FreeGuide,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: () => <LegalPage title="Terms of Service" />,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: () => <LegalPage title="Privacy Policy" />,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: () => <LegalPage title="Enterprise Contact" />,
});

const routeTree = rootRoute.addChildren([
  indexRoute, 
  affiliateRoute, 
  blogRoute, 
  blogPostRoute, 
  profileRoute, 
  guideRoute,
  termsRoute,
  privacyRoute,
  contactRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
