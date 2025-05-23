'use client';

import React, { useState } from 'react';
import { LinkedInPost } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heart, MessageSquare, Copy, Link } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostListItemProps {
  post: LinkedInPost;
}

export function PostListItem({ post }: PostListItemProps) {
  const [copiedContent, setCopiedContent] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  // Helper function to truncate content for list view
  const truncateContent = (content: string, maxLength: number = 150) => {
    // Remove line breaks for list view
    const singleLineContent = content.replace(/\n+/g, ' ');
    if (singleLineContent.length <= maxLength) return singleLineContent;
    return singleLineContent.substring(0, maxLength) + '...';
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

  return (
    <>
      <div className="flex gap-4 p-4 border-b hover:bg-muted/50 transition-colors">
        {/* Thumbnail */}
        {post.media && post.media.thumbnailUrl && (
          <div className="flex-shrink-0">
            <img
              src={post.media.thumbnailUrl}
              alt="Post thumbnail"
              className="w-20 h-20 object-cover rounded"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">
            {formatDate(post.publishedAt)}
          </p>
          <p className="text-sm line-clamp-2 mb-2">
            {truncateContent(post.content)}
          </p>
          
          {/* Engagement Metrics */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {post.engagement.likes}
            </span>
            <button
              onClick={() => setShowCommentsModal(true)}
              className="flex items-center gap-1 hover:text-primary transition-colors"
              disabled={!post.comments || post.comments.length === 0}
            >
              <MessageSquare className="w-3 h-3" />
              {post.engagement.comments}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyContent}
            className="h-8"
          >
            <Copy className="w-4 h-4" />
            <span className="sr-only">{copiedContent ? 'Copied!' : 'Copy Content'}</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyUrl}
            className="h-8"
          >
            <Link className="w-4 h-4" />
            <span className="sr-only">{copiedUrl ? 'Copied!' : 'Copy URL'}</span>
          </Button>
        </div>

        {/* Toast notifications for copy actions */}
        {copiedContent && (
          <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg animate-in fade-in slide-in-from-bottom-2">
            Content copied!
          </div>
        )}
        {copiedUrl && (
          <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg animate-in fade-in slide-in-from-bottom-2">
            URL copied!
          </div>
        )}
      </div>

      {/* Comments Modal */}
      <Dialog open={showCommentsModal} onOpenChange={setShowCommentsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comments ({post.comments?.length || 0})</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="space-y-1 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{comment.author}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.publishedAt)}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No comments yet</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
