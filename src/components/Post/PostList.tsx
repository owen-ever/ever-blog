'use client';

import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';

const PostList = ({ posts }: { posts: Post[] }) => {
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  useEffect(() => {
    if (selectedTag.length > 0) {
      setFilteredPosts(posts.filter(post => post.meta.tag?.some(tag => selectedTag.includes(tag))));
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, selectedTag]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {Array.from(new Set(posts.flatMap(post => post.meta.tag || []))).map(tag => (
          <button
            key={tag}
            onClick={() => {
              if (selectedTag.includes(tag)) {
                setSelectedTag(selectedTag.filter(t => t !== tag));
              } else {
                setSelectedTag([...selectedTag, tag]);
              }
            }}
            className={`rounded-full px-4 py-1 text-sm ${
              selectedTag.includes(tag) ? 'bg-main text-white' : 'bg-gray-200 text-gray-700'
            }`}>
            {tag}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-4">
        {filteredPosts.map(post => (
          <li key={post.slug} className="border-main border-2 p-4">
            <Link href={`/posts/${post.slug}`} className="flex flex-col gap-2">
              <span className="text-xl font-bold">{post.meta.title}</span>
              <span className="text-gray-600">{post.meta.description}</span>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{post.meta.date}</span>
                <div className="flex gap-2">
                  {post.meta.tag?.map(tag => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
