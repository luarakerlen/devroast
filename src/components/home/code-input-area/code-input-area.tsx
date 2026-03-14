import { useEffect, useMemo, useRef, useState } from 'react';
import { codeToHtml } from 'shiki';
import {
  detectLanguage,
  LanguageSelector,
} from '@/components/ui/language-selector/language-selector';
import styles from './code-input-area.module.css';

export interface CodeInputAreaProps {
  code: string;
  onCodeChange: (code: string) => void;
  language?: string | null;
  onLanguageChange?: (language: string) => void;
}

export function CodeInputArea({
  code,
  onCodeChange,
  language,
  onLanguageChange,
}: CodeInputAreaProps) {
  const lines = code.split('\n').length;
  const lineNumbers = [...Array(Math.max(lines, 16))].map((_, i) => i + 1);

  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [highlightedCode, setHighlightedCode] = useState('');
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  const [userSelectedLanguage, setUserSelectedLanguage] = useState(false);

  useEffect(() => {
    if (language !== undefined) {
      setCurrentLanguage(language);
      setIsAutoDetected(false);
    }
  }, [language]);

  useEffect(() => {
    const detectAndHighlight = async () => {
      if (!code || code.trim().length < 5) {
        setHighlightedCode('');
        return;
      }

      let langToUse: string | null = currentLanguage;

      // Se o usuário não selecionou manualmente, sempre detectar
      if (!userSelectedLanguage) {
        const detected = detectLanguage(code);
        if (detected) {
          langToUse = detected;
          setIsAutoDetected(true);
          if (onLanguageChange) {
            onLanguageChange(detected);
          }
        } else {
          langToUse = 'plaintext';
          setIsAutoDetected(false);
        }
      }

      const lang = langToUse || 'plaintext';

      try {
        const html = await codeToHtml(code, {
          lang: lang,
          theme: 'vesper',
        });
        setHighlightedCode(html);
      } catch {
        const plainHtml = await codeToHtml(code, {
          lang: 'plaintext',
          theme: 'vesper',
        });
        setHighlightedCode(plainHtml);
      }
    };

    const timeoutId = setTimeout(detectAndHighlight, 50);
    return () => clearTimeout(timeoutId);
  }, [code, currentLanguage, userSelectedLanguage, onLanguageChange]);

  const hasHighlight = highlightedCode && code.length > 0;

  const handleLanguageChange = (lang: string | null) => {
    if (lang === null) {
      setUserSelectedLanguage(false);
      setCurrentLanguage(null);
    } else {
      setUserSelectedLanguage(true);
      setCurrentLanguage(lang);
      setIsAutoDetected(false);
      if (onLanguageChange) {
        onLanguageChange(lang);
      }
    }
  };

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const highlightedContent = useMemo(() => {
    if (!highlightedCode) return null;
    return (
      <div
        ref={highlightRef}
        className={styles.highlightLayer}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki returns safe HTML with proper escaping
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    );
  }, [highlightedCode]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <div className={`${styles.dot} ${styles.dotRed}`} />
          <div className={`${styles.dot} ${styles.dotYellow}`} />
          <div className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <LanguageSelector
          value={currentLanguage}
          onChange={handleLanguageChange}
          isAutoDetected={isAutoDetected}
        />
      </div>
      <div className={styles.body}>
        <div ref={lineNumbersRef} className={styles.lineNumbers}>
          {lineNumbers.map((lineNum) => (
            <span key={lineNum} className={styles.lineNumber}>
              {lineNum}
            </span>
          ))}
        </div>
        <div className={styles.editorWrapper}>
          {highlightedContent}
          {!code && (
            <span className={styles.placeholder}>
              {`// paste your code here...`}
            </span>
          )}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            onScroll={handleScroll}
            className={`${styles.textarea} ${hasHighlight ? styles.textareaWithHighlight : ''}`}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
