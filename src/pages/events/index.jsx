"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { getEvents, volunteerForEvent } from "@/data/events";
import { PlusCircle } from "lucide-react";

export default function Events() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading Events...");

  useEffect(() => {
    getEvents()
      .then((response) => {
        // The response had no errors
        if (response) {
          setEvents(response);
          setIsLoading(false);
        } else {
          // Handle non-200 responses
          setLoadingMessage(`Error loading events: Status ${response.status}`);
        }
      })
      .catch((error) => {
        // The response had errors
        setLoadingMessage(`Error loading events: ${error.message}`);
        setIsLoading(false); // Set isLoading to false even in error case
      });
  }, []);

  const handleCreateEvent = () => {
    router.push("/events/new");
  };

  const handleVolunteer = (eventId) => {
    // Handle volunteer action here
    volunteerForEvent(eventId)
      .then((response) => {
        if (response) {
          // Successfully volunteered for the event
          console.log("Successfully volunteered for event:", response);
        }
      })
      .catch((error) => {
        // The response had errors
        console.error("Error volunteering for event:", error.message);
      });
  };

  if (isLoading) {
    return <p>{loadingMessage}</p>;
  }

  // Check if events exists AND has length
  if (!events || events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 gap-4">
        <Card
          className="w-[350px] border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleCreateEvent}
        >
          <CardContent className="flex flex-col items-center justify-center py-8">
            <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-lg font-medium">Create New Event</p>
            <p className="text-sm text-gray-500">Click to add a new event</p>
          </CardContent>
        </Card>
        {events.map((event) => (
          <Card key={event.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{event.address}</p>
              <p>Date: {event.date}</p>
              <p>Location: {event.location.city}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => router.push(`/events/${event.id}`)}>
                View Details
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleVolunteer(event.id);
                }}
              >
                Volunteer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
