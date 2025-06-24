import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const MarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-invert max-w-none text-sm table-fixed [&_td]:break-words [&_th]:text-neon-cyan">
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg"
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className="bg-gray-800 text-green-400 px-1 py-0.5 rounded">
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// export const MarkdownRenderer = ({ content }: { content: string }) => {
//     return (
//     <div className="prose prose-invert max-w-none text-sm table-fixed [&_td]:break-words [&_th]:text-neon-cyan"
//         <ReactMarkdown
//             rehypePlugins={[rehypeRaw]}
//             remarkPlugins={[remarkGfm]}
//             components={{
//                 code({ node, inline, className, children, ...props }) {
//                     const match = /language-(\w+)/.exec(className || "");
//                     return !inline && match ? (
//                         <SyntaxHighlighter
//                             style={oneDark}
//                             language={match[1]}
//                             PreTag="div"
//                             className="rounded-lg"
//                             {...props}
//                         >
//                             {String(children).replace(/\n$/, "")}
//                         </SyntaxHighlighter>
//                     ) : (
//                         <code className="bg-gray-800 text-green-400 px-1 py-0.5 rounded">
//                             {children}
//                         </code>
//                     );
//                 },
//             }}
//         >
//             {content}
//         </ReactMarkdown>
//         </div>
//     );
// };
