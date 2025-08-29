interface PostMeta {
  index: number;
  title: string;
  description: string;
  date: string;
  tag?: string;
}

interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

type SortByType = 'date' | 'title';

interface SortByListType {
  DATE: 'date';
  TITLE: 'title';
}
