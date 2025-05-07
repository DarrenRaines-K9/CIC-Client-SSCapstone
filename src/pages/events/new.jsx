"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addEvent } from "@/data/events";

export default function NewEvent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    location: {
      city: "",
      state: "",
      x_coordinate: "",
      y_coordinate: "",
    },
    time: "",
    date: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const locationField = name.split(".")[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await addEvent(formData);
      if (response) {
        router.push("/events");
      } else {
        setErrorMessage(`Error creating event: ${response}`);
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(`Error creating event: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/events");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center m-10">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
          {errorMessage}
        </div>
      )}

      <Card className="w-[850px]">
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                  placeholder="Event Title"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="location.city">City</label>
                  <Input
                    id="location.city"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleFormChange}
                    required
                    placeholder="City"
                  />
                </div>
                <div>
                  <label htmlFor="location.state">State</label>
                  <Input
                    id="location.state"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleFormChange}
                    required
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="location.x_coordinate">X Coordinate</label>
                  <Input
                    id="location.x_coordinate"
                    name="location.x_coordinate"
                    value={formData.location.x_coordinate}
                    onChange={handleFormChange}
                    required
                    placeholder="X Coordinate"
                  />
                </div>
                <div>
                  <label htmlFor="location.y_coordinate">Y Coordinate</label>
                  <Input
                    id="location.y_coordinate"
                    name="location.y_coordinate"
                    value={formData.location.y_coordinate}
                    onChange={handleFormChange}
                    required
                    placeholder="Y Coordinate"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="time">Time</label>
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                    required
                    placeholder="Time"
                  />
                </div>
                <div>
                  <label htmlFor="date">Date</label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                    placeholder="Date (YYYY-MM-DD)"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Event"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
