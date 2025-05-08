import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export default function Home() {
    return (
      <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-screen h-auto">
        <CardHeader  className="flex flex-col items-center">
          <CardTitle>Home</CardTitle>
          <CardDescription>Welcome to Champions in Christ!!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-full mt-4 overflow-hidden rounded-md">
            <Image 
              priority
              src="/Home.jpg" 
              alt="Home Page Image" 
              width={2000}
              height={2000}
              className="object-cover"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
          </div>
    )
  }

