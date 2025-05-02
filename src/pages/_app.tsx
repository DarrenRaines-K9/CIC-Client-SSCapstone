import { ThemeProvider } from "@/app/theme-provider";
import { AppWrapper } from "../components/AppWrapper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "../app/globals.css";

export default function RootLayout({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const queryClient = new QueryClient()
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange>
      <AppWrapper>
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </AppWrapper>
    </ThemeProvider>
  )
}
{/* The rest of your application */}