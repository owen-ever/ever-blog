'use client';

import { useState } from 'react';

const PostList = ({ posts }: { posts: Post[] }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  const clearFilters = () => {
    setSelectedTag(null);
  };

  const tagList = Array.from(new Set(posts.flatMap(post => post.meta.tag || [])));

  const filteredData = posts.filter(item => (selectedTag ? item.meta.tag === selectedTag : true));

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.meta.date.replace(/\./g, '-')).getTime() - new Date(a.meta.date.replace(/\./g, '-')).getTime();
    } else {
      return a.meta.title.localeCompare(b.meta.title);
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <section className="mb-8">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">/ FILTER</span>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 underline transition-colors hover:text-gray-900">
                CLEAR FILTER
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSortBy('date')}
                className={`text-sm font-medium transition-colors ${
                  sortBy === 'date' ? 'border-b border-gray-900 text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}>
                / DATE
              </button>
              <button
                onClick={() => setSortBy('title')}
                className={`text-sm font-medium transition-colors ${
                  sortBy === 'title' ? 'border-b border-gray-900 text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}>
                / TITLE
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filter Sidebar */}
          <div className="flex-shrink-0 lg:w-64">
            <div className="space-y-3">
              {tagList.map(tag => (
                <label key={tag} className="flex cursor-pointer items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedTag === tag}
                      onChange={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className="sr-only"
                    />
                    <div
                      className={`flex h-4 w-4 items-center justify-center border border-gray-400 ${
                        selectedTag === tag ? 'bg-gray-900' : 'bg-white'
                      }`}>
                      {selectedTag === tag && <span className="text-xs text-white">✓</span>}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{tag.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Feed List */}
          <div className="flex-1">
            <div className="space-y-0">
              {sortedData.map((item, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer flex-col gap-4 border-b py-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center">
                  <div className="flex-shrink-0 font-mono text-sm text-gray-600 sm:w-24">{item.meta.date}</div>
                  <div className="flex-1">
                    <h3 className="text-colPick mb-2 text-xl font-semibold">{item.meta.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostList;
