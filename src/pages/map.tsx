import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { APIProvider, Map } from '@vis.gl/react-google-maps';

export default function GoogleMaps() {
    // Get the API key from the Next.js environment variable
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    
    return (
      <div className="flex h-screen w-full items-center justify-center">        
      <Card className="w-screen h-auto">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Map</CardTitle>
          <CardDescription>Interactive Google Map</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {googleMapsApiKey ? (
            <APIProvider apiKey={googleMapsApiKey}>
              <Map
                style={{ width: '100%', height: '850px' }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
              />
            </APIProvider>
          ) : (
            <div className="flex items-center justify-center h-[400px] bg-gray-100 text-gray-500">
              Google Maps API key not found
            </div>
          )}
        </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button> */}
          </CardFooter>
      </Card>
      </div>
    )
}