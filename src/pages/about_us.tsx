
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

export default function AboutUs() {
    return (
      <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-screen h-auto">
        <CardHeader  className="flex flex-col items-center">
          <CardTitle>About Us</CardTitle>
          <CardDescription> As a 501(c) non-profit organization tasked with feeding the homeless, It is imperative to collect as much data as possible to be efficient in our efforts to provide relief to those in need. Champions in Christ aims to fill the void and track every piece of data throughout the process of servicing those in need, through Inventory and volunteer management as well as detailed reporting through our database structure.Giving the user a robust visualization of the data via Google Maps Heat Signatures using Geolocation techniques. In doing so allowing us to better equip ourselves through means of inventory and volunteer management based off of hard data analysis for locations we provide our services to, whether that be an increase or decrease in our resources. Ultimately becoming more efficient in the way we service our community.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full mt-4 overflow-hidden rounded-md">
            <Image 
              priority
              src="/AboutUs.jpg" 
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