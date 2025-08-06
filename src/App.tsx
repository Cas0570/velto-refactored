// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ROUTES } from "@/lib/constants";

// Pages
import { HomePage } from "@/pages/HomePage";
import { WelcomePage } from "@/pages/WelcomePage";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NewRequestPage } from "@/pages/NewRequestPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { PaymentPage } from "@/pages/PaymentPage";
import { BrandingPage } from "@/pages/BrandingPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
            <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.NEW_REQUEST} element={<NewRequestPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.BRANDING} element={<BrandingPage />} />
            <Route path={`${ROUTES.PAYMENT}/:id`} element={<PaymentPage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;