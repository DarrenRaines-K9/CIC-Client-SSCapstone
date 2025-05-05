"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getEventById, deleteEvent, editEvent } from "@/data/events";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading Event...");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form state for editing
  const [editFormData, setEditFormData] = useState({
    title: "",
    location: {
      id: 0,
      city: "",
      state: "",
      x_coordinate: "",
      y_coordinate: "",
    },
    time: "",
    date: "",
  });

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = () => {
    getEventById(id)
      .then((response) => {
        if (response) {
          setEvent(response);
          // Initialize form data with event data
          setEditFormData({
            title: response.title,
            location: {
              id: response.location.id,
              city: response.location.city,
              state: response.location.state,
              x_coordinate: response.location.x_coordinate,
              y_coordinate: response.location.y_coordinate,
            },
            time: response.time,
            date: response.date,
          });
          setIsLoading(false);
        } else {
          setLoadingMessage(`Error loading event: Event not found`);
        }
      })
      .catch((error) => {
        setLoadingMessage(`Error loading event: ${error.message}`);
        setIsLoading(false);
      });
  };

  const handleDeleteEvent = () => {
    setIsLoading(true);
    setLoadingMessage("Deleting event...");

    deleteEvent(id)
      .then(() => {
        router.push("/events");
      })
      .catch((error) => {
        setLoadingMessage(`Error deleting event: ${error.message}`);
        setIsLoading(false);
      });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const locationField = name.split(".")[1];
      setEditFormData({
        ...editFormData,
        location: {
          ...editFormData.location,
          [locationField]: value,
        },
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage("Updating event...");

    editEvent(id, editFormData)
      .then(() => {
        loadEvent(); // Reload the event after edit
      })
      .catch((error) => {
        setLoadingMessage(`Error updating event: ${error.message}`);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p className="text-center py-8">{loadingMessage}</p>;
  }

  if (!event) {
    return <p className="text-center py-8">No event found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Event Details</h1>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {event.location.city}, {event.location.state}
            </p>
            <p>
              <span className="font-semibold">Coordinates:</span>{" "}
              {event.location.x_coordinate}, {event.location.y_coordinate}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {event.time}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {event.date}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/events")}>
            Back to Events
          </Button>
          <div className="space-x-2">
            {/* Edit Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="title">Title</label>
                      <Input
                        id="title"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="location.city">City</label>
                        <Input
                          id="location.city"
                          name="location.city"
                          value={editFormData.location.city}
                          onChange={handleEditFormChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="location.state">State</label>
                        <Input
                          id="location.state"
                          name="location.state"
                          value={editFormData.location.state}
                          onChange={handleEditFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="location.x_coordinate">
                          X Coordinate
                        </label>
                        <Input
                          id="location.x_coordinate"
                          name="location.x_coordinate"
                          value={editFormData.location.x_coordinate}
                          onChange={handleEditFormChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="location.y_coordinate">
                          Y Coordinate
                        </label>
                        <Input
                          id="location.y_coordinate"
                          name="location.y_coordinate"
                          value={editFormData.location.y_coordinate}
                          onChange={handleEditFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="time">Time</label>
                        <Input
                          id="time"
                          name="time"
                          value={editFormData.time}
                          onChange={handleEditFormChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="date">Date</label>
                        <Input
                          id="date"
                          name="date"
                          value={editFormData.date}
                          onChange={handleEditFormChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleEditSubmit}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Delete Button */}
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </Button>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteEvent}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
