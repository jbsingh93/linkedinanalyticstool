/**
 * Home Page Component
 * 
 * This page provides a simple welcome message and a button to navigate to the login page.
 * It serves as an entry point to the application, directing users to authenticate.
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-112px)]">
      <Card className="w-full max-w-md mx-auto text-center shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">LinkedIn Post Search Tool</CardTitle>
          <CardDescription>
            A simple tool to search and manage your LinkedIn posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-neutral-700">
            This tool helps you organize, search, and analyze your LinkedIn posts.
            Sign in to get started.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
