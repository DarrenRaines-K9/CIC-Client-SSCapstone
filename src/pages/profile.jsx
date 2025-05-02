import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "../app/globals.css";
import useAppContext from "@/components/AppWrapper";
import { getUserProfile, updateUserProfile } from "@/data/auth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Profile() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { profile, setProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  // Load profile from API
  useEffect(() => {
    getUserProfile().then((data) => {
      if (data) {
        setProfile(data);
        setFormData({
          first_name: data.user?.first_name || "",
          last_name: data.user?.last_name || "",
          email: data.user?.email || "",
          phone_number: data.phone_number || "",
          address: data.address || "",
        });
      }
    });
  }, [setProfile]);
  if (!profile) {
    return <div>Loading...</div>; // or a loading spinner
  }

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updatedProfile = await updateUserProfile(formData);
      setProfile(updatedProfile); // update global profile context
      setIsEditing(false); // exit editing mode
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              {isEditing ? (
                <>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                  <Label htmlFor="address">Address</Label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <Label>First Name: {profile.user?.first_name}</Label>
                  <Label>Last Name: {profile.user?.last_name}</Label>
                  <Label>Email: {profile.user?.email}</Label>
                  <Label>Phone Number: {profile.phone_number}</Label>
                  <Label>Address: {profile.address}</Label>
                </>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        ) : (
          <Link href="/">
            <Button variant="outline">Back</Button>
          </Link>
        )}
        {isEditing ? (
          <Button onClick={handleUpdate}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </CardFooter>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
{
  /* <Card className="m-5">
  <CardHeader>
    <CardTitle>Events You Vounteered For</CardTitle>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Event</Label>
          <Input id="name" placeholder="Event" />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button>Add</Button>
  </CardFooter>
</Card> */
}
