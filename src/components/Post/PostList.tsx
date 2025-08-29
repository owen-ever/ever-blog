'use client';

import { useState } from 'react';

const FilterList: SortByListType = {
  DATE: 'date',
  TITLE: 'title',
};

const PostList = ({ posts }: { posts: Post[] }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortByType>(FilterList.DATE);

  const clearFilters = () => {
    setSelectedTag(null);
  };

  const tagList = Array.from(new Set(posts.flatMap(post => post.meta.tag || [])));

  const filteredData = posts.filter(item => (selectedTag ? item.meta.tag === selectedTag : true));

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === FilterList.DATE) {
      return new Date(b.meta.date.replace(/\./g, '-')).getTime() - new Date(a.meta.date.replace(/\./g, '-')).getTime();
    } else {
      return a.meta.title.localeCompare(b.meta.title);
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <section className="mx-auto w-full">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex flex-col gap-4 lg:w-1/4">
            <div className="flex items-center gap-4 border-b pb-4">
              <button
                onClick={clearFilters}
                className="hover:text-colPick cursor-pointer pb-0.5 text-sm font-semibold text-gray-500 transition-colors">
                CLEAR FILTER
              </button>
            </div>
            <div className="space-y-3">
              {tagList.map(tag => (
                <label
                  key={tag}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}>
                  <span className="text-colPick font-mono text-xl">({selectedTag === tag ? '✔️' : ' '})</span>
                  <span className="text-colPick font-medium uppercase">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:w-3/4">
            <div className="flex items-center gap-4 border-b pb-4">
              {Object.entries(FilterList).map(([key, value]) => (
                <div key={key} className="sm:w-24">
                  <button
                    onClick={() => setSortBy(value)}
                    className={`text-sm font-semibold transition-colors ${
                      sortBy === value
                        ? 'border-main text-main border-b-main border-b-2'
                        : 'hover:text-colPick cursor-pointer text-gray-500'
                    }`}>
                    {key}
                  </button>
                </div>
              ))}
            </div>
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
