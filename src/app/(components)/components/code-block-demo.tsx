import {
  CodeBlockContent,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockRoot,
} from '@/components/ui/code-block';

const sampleCode = `function calculateTotal(items) {
  let total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

export function CodeBlockDemo() {
  return (
    <CodeBlockRoot>
      <CodeBlockHeader>
        <CodeBlockFilename>calculate.js</CodeBlockFilename>
      </CodeBlockHeader>
      <CodeBlockContent code={sampleCode} language="javascript" />
    </CodeBlockRoot>
  );
}
