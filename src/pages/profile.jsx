import * as React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
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
import { getUserProfile } from "@/data/auth";

export default function Profile() {
  const { setTheme } = useTheme();
  const { profile, setProfile } = useAppContext();

  useEffect(() => {
    getUserProfile().then((data) => {
      if (data) {
        setProfile(data);
      }
    });
  }, [setProfile]);

  return (
    <Card className="w-[350px] items center">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input id="name" placeholder="Username" />
              <Label htmlFor="name">Password</Label>
              <Input id="name" placeholder="Password" />
              <Label htmlFor="name">First Name</Label>
              <Input id="name" placeholder="First Name" />
              <Label htmlFor="name">Last Name</Label>
              <Input id="name" placeholder="Last Name" />
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="Email" />
              <Label htmlFor="name">Phone Number</Label>
              <Input id="name" placeholder="Phone Number" />
              <Label htmlFor="name">Address</Label>
              <Input id="name" placeholder="Address" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button>Update</Button>
      </CardFooter>
      <Card className="m-5">
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
      </Card>
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
