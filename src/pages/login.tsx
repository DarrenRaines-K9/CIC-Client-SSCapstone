import * as React from "react";
import useAppContext from "@/components/AppWrapper";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/data/auth";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
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

export default function Login() {
  const { setTheme } = useTheme();
  // After storing the setToken function in context, we destructure it here
  const { setToken } = useAppContext();
  const username = useRef("");
  const password = useRef("");
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value.trim(),
      password: password.current.value.trim()
    };


    login(user).then((res) => {
      if (res.token) {
        // Because we destructured the setToken function, we can update state here
        setToken(res.token)
        localStorage.setItem("token", res.token);
        // Redirect to the home page after successful login
        router.push("/")
      }
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
    <Card className="w-[350px] items center">
      <CardHeader>
        <CardTitle>Welcome Please Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                ref={username}
                type="text"
                placeholder="Username"
                />
              <Label htmlFor="name">Password</Label>
              <Input
                id="name"
                ref={password}
                type="text"
                placeholder="Password"
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
        <Link href="/register">
          <Button variant="outline">Register</Button>
        </Link>
        <Link href="/about_us">
          <Button onClick={submit}>Login</Button>
        </Link>
      </CardFooter>
    </Card>
                </div>
  );
}
