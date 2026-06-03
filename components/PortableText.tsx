import type { AnswerBlock } from "../sanity/fetch";

export default function PortableText({ blocks }: { blocks?: AnswerBlock[] }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <div className="prose">
      {blocks.map((block, i) => (
        <p key={block._key ?? i}>
          {(block.children ?? []).map((span, j) =>
            span.marks?.includes("strong") ? (
              <strong key={j}>{span.text}</strong>
            ) : (
              <span key={j}>{span.text}</span>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
