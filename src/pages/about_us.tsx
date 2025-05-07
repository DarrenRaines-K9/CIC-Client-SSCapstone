
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Test() {
    return (
      <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[850px]">
        <CardHeader>
          <CardTitle>About Us</CardTitle>
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
          </div>
    )
  }