/**
 * Dashboard Page Component
 * 
 * This is the main dashboard that displays the user's LinkedIn posts.
 * Currently using mock data for development purposes.
 * In the future, this will fetch real data from Supabase.
 */

'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PostList } from "@/components/posts/PostList";
import { SearchBar } from "@/components/SearchBar";
import { mockPosts } from "@/lib/mockData";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate statistics from mock data
  const stats = {
    totalPosts: mockPosts.length,
    totalEngagement: mockPosts.reduce((sum, post) => sum + post.engagement.likes + post.engagement.comments, 0),
    averageLikes: Math.round(mockPosts.reduce((sum, post) => sum + post.engagement.likes, 0) / mockPosts.length)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome section with search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Welcome to your LinkedIn Post Dashboard</h1>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search posts..."
          />
          
          {/* This logout button is just for UI demonstration - no functionality yet */}
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Logout</Link>
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Posts</CardDescription>
            <CardTitle className="text-3xl">{stats.totalPosts}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Engagement</CardDescription>
            <CardTitle className="text-3xl">{stats.totalEngagement}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Likes</CardDescription>
            <CardTitle className="text-3xl">{stats.averageLikes}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Posts List */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your LinkedIn Posts</CardTitle>
          <CardDescription>
            View and manage your LinkedIn posts. Click on engagement metrics for details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostList posts={mockPosts} searchQuery={searchQuery} />
        </CardContent>
      </Card>
    </div>
  );
}
