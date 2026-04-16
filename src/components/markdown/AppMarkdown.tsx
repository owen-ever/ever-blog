import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import './AppMarkdown.css';

interface AppMarkdownProps {
  text: string;
  isViewMode?: boolean;
}

const AppMarkdown = ({ text, isViewMode = true }: AppMarkdownProps) => {
  return (
    <div className="md-text">
      {isViewMode ? (
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => <h2 {...props} />,
            ol: ({ start, ...props }) => <ol {...props} start={start ?? 1} />,
          }}>
          {text}
        </ReactMarkdown>
      ) : (
        <ReactMarkdown>{text}</ReactMarkdown>
      )}
    </div>
  );
};

export default AppMarkdown;
