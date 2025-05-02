import * as React from "react";
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
import { register } from "@/data/auth";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const { setToken } = useAppContext();
  const { setTheme } = useTheme();

  const firstName = useRef("");
  const lastName = useRef("");
  const username = useRef("");
  const password = useRef("");
  const email = useRef("");
  const phoneNumber = useRef("");
  const address = useRef("");
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    const user = {
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
      phone_number: phoneNumber.current.value,
      address: address.current.value,
    };
    // Call your API to register the user
    register(user).then((response) => {
      if (response.token) {
        router.push("/login").then(() => {
          setToken(response.token);
        });
        localStorage.setItem("token", response.token);
      }
    });
  };

  return (
    <Card className="w-[350px] items center">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                ref={username}
                type="text "
                placeholder="Username"
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                ref={password}
                type="text"
                placeholder="Password"
              />
              <Label htmlFor="first name">First Name</Label>
              <Input
                id="first name"
                ref={firstName}
                type="text"
                placeholder="First Name"
              />
              <Label htmlFor="last name">Last Name</Label>
              <Input
                id="last name"
                ref={lastName}
                type="text"
                placeholder="Last Name"
              />
              <Label htmlFor="email">Email</Label>
              <Input id="email" ref={email} type="text" placeholder="Email" />
              <Label htmlFor="phone number">Phone Number</Label>
              <Input
                id="phone number"
                ref={phoneNumber}
                type="text"
                placeholder="Phone Number"
              />
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                ref={address}
                type="text"
                placeholder="Address"
              />
            </div>
          </div>
        </form>
      </CardContent>
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
      <CardFooter className="flex justify-between">
        <Link href="/login">
          <Button variant="outline">Back</Button>
        </Link>
        <Button onClick={submit}>Register</Button>
      </CardFooter>
    </Card>
  );
}
