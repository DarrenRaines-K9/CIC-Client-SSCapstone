import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export default function Home() {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Home</CardTitle>
          <CardDescription>Dont Forget to Update This With Image!!!!!</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form>
            <div className="grid w-full items-center gap-4">

              <div className="flex flex-col space-y-1.5">
              </div>
            </div>
          </form> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
    )
  }

  // Home.getLayout = function getLayout(page) {
  //   return (
  //     <RootLayout>
  //       <NavBar />
  //      <section className="container">{page}</section>
  //     </RootLayout>
  //   )
  // }