import hljs from 'highlight.js';
import { useEffect, useRef, useState } from 'react';
import styles from './language-selector.module.css';

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
  { id: 'cpp', name: 'C++' },
  { id: 'c', name: 'C' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'php', name: 'PHP' },
  { id: 'swift', name: 'Swift' },
  { id: 'kotlin', name: 'Kotlin' },
  { id: 'scala', name: 'Scala' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'scss', name: 'SCSS' },
  { id: 'sql', name: 'SQL' },
  { id: 'bash', name: 'Bash' },
  { id: 'shell', name: 'Shell' },
  { id: 'json', name: 'JSON' },
  { id: 'yaml', name: 'YAML' },
  { id: 'xml', name: 'XML' },
  { id: 'markdown', name: 'Markdown' },
  { id: 'dockerfile', name: 'Dockerfile' },
  { id: 'plaintext', name: 'Plain Text' },
];

export interface LanguageSelectorProps {
  value: string | null;
  onChange: (language: string | null) => void;
  isAutoDetected?: boolean;
  className?: string;
}

export function LanguageSelector({
  value,
  onChange,
  isAutoDetected,
  className,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = languages.find((lang) => lang.id === value);

  const displayText =
    value === null ? 'Auto Detect' : selectedLanguage?.name || 'Auto Detect';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className || ''}`}
    >
      <button
        type="button"
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayText}</span>
        {isAutoDetected && value && (
          <span className={styles.detected}>(detected)</span>
        )}
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            type="button"
            className={`${styles.option} ${value === null ? styles.optionActive : ''}`}
            onClick={() => {
              onChange(null);
              setIsOpen(false);
            }}
          >
            Auto Detect
          </button>
          {languages.map((lang) => (
            <button
              key={lang.id}
              type="button"
              className={`${styles.option} ${value === lang.id ? styles.optionActive : ''}`}
              onClick={() => {
                onChange(lang.id);
                setIsOpen(false);
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function detectLanguage(code: string): string | null {
  if (!code || code.trim().length < 5) {
    return null;
  }

  const result = hljs.highlightAuto(code);
  if (result.language) {
    const langId = mapToSupportedLanguage(result.language);
    if (langId) {
      return langId;
    }
  }
  return null;
}

function mapToSupportedLanguage(detected: string): string | null {
  const languageMapping: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    rb: 'ruby',
    sh: 'bash',
    yml: 'yaml',
    md: 'markdown',
    csharp: 'csharp',
    'c++': 'cpp',
    objectivec: 'objectivec',
    sql: 'sql',
    plaintext: 'plaintext',
  };

  const normalized = detected.toLowerCase();
  if (languages.some((l) => l.id === normalized)) {
    return normalized;
  }

  return languageMapping[normalized] || null;
}
