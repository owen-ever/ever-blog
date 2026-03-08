import { Box } from '@mui/material';
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
    <Box className="md-text">
      {isViewMode ? (
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
          components={{
            ol: ({ start, ...props }) => <ol {...props} start={1} />,
          }}>
          {text}
        </ReactMarkdown>
      ) : (
        <ReactMarkdown>{text}</ReactMarkdown>
      )}
    </Box>
  );
};

export default AppMarkdown;
