import { ThemeProvider } from "@/app/theme-provider";
import { AppWrapper } from "../components/AppWrapper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "../app/globals.css";
import Head from "next/head";
import AppSideBAr from "../components/app-sidebar";
import { SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"

// import { AppThemeProvider } from "@/components/app-themeProvider";


export default function RootLayout({ Component, pageProps}) {
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
        <Head>
          <title>
            Champions In Christ
          </title>
        </Head>
        <main className="container">
      <QueryClientProvider client={queryClient}>
      <SidebarProvider>
      < AppSideBAr />   
      {/* <AppThemeProvider /> */}
      <SidebarTrigger />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
      </SidebarProvider>
      </QueryClientProvider>
        </main>
      </AppWrapper>
    </ThemeProvider>
  )
}