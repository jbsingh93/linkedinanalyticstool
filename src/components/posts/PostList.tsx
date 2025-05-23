'use client';

import React, { useState } from 'react';
import { LinkedInPost } from '@/lib/mockData';
import { PostCard } from './PostCard';
import { PostListItem } from './PostListItem';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

interface PostListProps {
  posts: LinkedInPost[];
  searchQuery?: string;
}

type ViewMode = 'card' | 'list';

export function PostList({ posts, searchQuery = '' }: PostListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery.trim()) return true;
    
    const searchLower = searchQuery.toLowerCase();
    // Search in post content
    const contentMatch = post.content.toLowerCase().includes(searchLower);
    // Search in comments if they exist
    const commentsMatch = post.comments?.some(comment => 
      comment.content.toLowerCase().includes(searchLower) ||
      comment.author.toLowerCase().includes(searchLower)
    );
    
    return contentMatch || commentsMatch;
  });

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <div className="w-full">
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-4">
        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {searchQuery && (
            <>
              Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              {searchQuery && ` matching "${searchQuery}"`}
            </>
          )}
          {!searchQuery && `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
        </p>
        
        {/* View mode buttons */}
        <div className="flex gap-1">
          <Button
            variant={viewMode === 'card' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('card')}
            className="gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            Card View
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="gap-2"
          >
            <List className="w-4 h-4" />
            List View
          </Button>
        </div>
      </div>

      {/* Posts Display */}
      {sortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery 
              ? `No posts found matching "${searchQuery}". Try a different search term.`
              : 'No posts available.'
            }
          </p>
        </div>
      ) : (
        <>
          {viewMode === 'card' ? (
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              {sortedPosts.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
