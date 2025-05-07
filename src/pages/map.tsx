import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"



export default function Map() {
    return (
      <div className="flex h-screen w-full items-center justify-center">        
      <Card className="w-[850px]">
        <CardHeader>
          <CardTitle>Map</CardTitle>
          <CardDescription>Dont Forget to Update This With Image!!!!!</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
      </div>
    )
  }