'use client';

import React, { useState } from 'react';
import { LinkedInPost } from '@/lib/mockData';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Copy, Link, ChevronDown, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: LinkedInPost;
}

export function PostCard({ post }: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  // Helper function to truncate content
  const truncateContent = (content: string, maxLength: number = 280) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Copy content to clipboard
  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  // Copy URL to clipboard
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(post.url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const shouldTruncate = post.content.length > 280;
  const displayContent = isExpanded ? post.content : truncateContent(post.content);

  return (
    <Card className="w-full mb-4 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="pt-6">
        {/* Post Date */}
        <p className="text-sm text-muted-foreground mb-3">
          {formatDate(post.publishedAt)}
        </p>

        {/* Post Content */}
        <div className="space-y-3">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {displayContent}
          </p>
          
          {/* See more/less toggle */}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-primary hover:underline focus:outline-none"
            >
              {isExpanded ? 'See less' : 'See more...'}
            </button>
          )}
        </div>

        {/* Media Content */}
        {post.media && (
          <div className="mt-4">
            {post.media.type === 'image' ? (
              <img
                src={post.media.url}
                alt="Post media"
                className="w-full rounded-lg object-cover max-h-96"
              />
            ) : (
              <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Video placeholder</p>
              </div>
            )}
          </div>
        )}

        {/* Engagement Metrics */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="w-4 h-4" />
            <span>{post.engagement.likes} likes</span>
          </div>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{post.engagement.comments} comments</span>
            {post.comments && post.comments.length > 0 && (
              showComments ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Comments Section (Expandable) */}
        {showComments && post.comments && post.comments.length > 0 && (
          <div className="mt-4 space-y-3 border-t pt-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{comment.author}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.publishedAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="pt-0 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyContent}
          className="flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copiedContent ? 'Copied!' : 'Copy Content'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyUrl}
          className="flex items-center gap-2"
        >
          <Link className="w-4 h-4" />
          {copiedUrl ? 'Copied!' : 'Copy URL'}
        </Button>
      </CardFooter>
    </Card>
  );
}
