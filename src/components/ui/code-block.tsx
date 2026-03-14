import { codeToHtml } from 'shiki';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export async function CodeBlock({
  code,
  language = 'javascript',
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'vesper',
  });

  return (
    <div className="w-[560px] border border-zinc-800 rounded overflow-hidden">
      {filename && (
        <div className="h-10 px-4 flex items-center gap-3 border-b border-zinc-800 bg-zinc-950">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="flex-1" />
          <span className="text-xs text-zinc-500 font-mono">{filename}</span>
        </div>
      )}
      <div
        className="bg-zinc-900 p-3 overflow-x-auto text-sm font-mono"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki returns safe HTML with proper escaping
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
