import { useMemo, useState } from 'react';

import {
  FormGroup,
  Label,
  Result,
  ResultLabel,
  TextArea,
} from '../common/FormElements';
import ToolCard from '../common/ToolCard';

function URLEncoderDecoder() {
  const [text, setText] = useState('');
  
  const [parseError, setParseError] = useState<string | null>(null);

  const looksLikeUrl = (input: string): boolean => {
    const trimmed = input.trim();
    
    // Check for obvious non-URL patterns first
    if (trimmed.includes('function') || trimmed.includes('const ') || trimmed.includes('let ') || 
        trimmed.includes('var ') || trimmed.includes('import ') || trimmed.includes('export ') ||
        trimmed.includes('{') || trimmed.includes('}') || trimmed.includes(';') ||
        trimmed.includes('console.') || trimmed.includes('return ') || trimmed.includes('if (') ||
        trimmed.includes('for (') || trimmed.includes('while (') || trimmed.includes('=>')) {
      return false;
    }
    
    // Basic URL pattern: protocol://domain or just domain with common TLDs
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/.*)?$|^[\w-]+\.(com|org|net|edu|gov|mil|int|co|uk|de|fr|it|es|ca|au|jp|cn|in|br|ru|mx|nl|se|no|dk|fi|pl|tr|za|ar|cl|pe|ve|co|ec|uy|py|bo|gy|sr|gf|fk|gs|hm|io|ac|ad|ae|af|ag|ai|al|am|ao|aq|as|at|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)(\/.*)?$/i;
    
    // Check if it looks like a URL as-is
    if (urlPattern.test(trimmed)) {
      return true;
    }
    
    // Check if it looks like an encoded URL (contains % encoding)
    if (trimmed.includes('%') && /^[a-zA-Z0-9%\-._~:/?#[\]@!$&'()*+,;=]+$/.test(trimmed)) {
      // Try to decode and see if it becomes a valid URL pattern
      try {
        const decoded = decodeURIComponent(trimmed);
        return urlPattern.test(decoded);
      } catch (_) {
        return false;
      }
    }
    
    return false;
  };

  const tryParseUrl = (raw: string): URL | null => {
    if (!raw) return null;

    const attempts: Array<() => URL> = [
      () => new URL(raw),
      () => new URL(`https://${raw}`),
    ];

    // Try decode then parse (covers inputs that are fully/partially percent-encoded)
    try {
      const decodedOnce = decodeURIComponent(raw);
      attempts.push(
        () => new URL(decodedOnce),
        () => new URL(`https://${decodedOnce}`)
      );
    } catch (_) {
      // ignore decode errors
    }

    for (const attempt of attempts) {
      try {
        return attempt();
      } catch (_) {
        // try next
      }
    }
    return null;
  };

  const parsedUrl = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      setParseError(null);
      return null;
    }
    
    // First check if it looks like a URL
    if (!looksLikeUrl(trimmed)) {
      setParseError('Input does not appear to be a URL');
      return null;
    }
    
    const url = tryParseUrl(trimmed);
    setParseError(url ? null : 'Invalid URL');
    return url;
  }, [text]);

  const safeDecodeURI = (value: string) => {
    try {
      return decodeURI(value);
    } catch (_) {
      return value;
    }
  };

  const safeDecodeURIComponent = (value: string) => {
    try {
      return decodeURIComponent(value);
    } catch (_) {
      return value;
    }
  };

  const renderWithDecoded = (encoded: string, decoded: string) => {
    const showDecoded = decoded !== encoded && decoded.trim() !== '';
    return (
      <>
        <div>{encoded || '—'}</div>
        {showDecoded && (
          <div style={{ color: '#6c757d', fontSize: 12 }}>decoded: {decoded}</div>
        )}
      </>
    );
  };

  const maybeShowEncoded = () => {
    // Only show encoded version for valid URLs
    if (!parsedUrl) return null;
    
    let decoded = text;
    let inputWasEncoded = false;
    try {
      const attempt = decodeURIComponent(text);
      inputWasEncoded = attempt !== text;
      decoded = inputWasEncoded ? attempt : text;
    } catch (_) {
      // leave decoded as original input; consider it not encoded
      inputWasEncoded = false;
    }
    const encoded = encodeURIComponent(decoded);

    if (!inputWasEncoded) {
      return (
        <Result>
          <ResultLabel>Encoded URL</ResultLabel>
          <TextArea value={encoded} readOnly rows={3} />
        </Result>
      );
    }
  };
  // No explicit encode/decode buttons; everything updates automatically below

  return (
    <ToolCard
      title="URL Encoder/Decoder"
      icon="🔗"
      description="Encode/decode text and parse URL parts via the URL API"
    >
      <FormGroup>
        <Label>Input</Label>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL or text"
        />
      </FormGroup>

      {parsedUrl && (
        <Result>
          <ResultLabel>Parsed URL</ResultLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: 6, columnGap: 10 }}>
            <div><strong>href</strong></div>
            <div>{renderWithDecoded(parsedUrl.href, safeDecodeURI(parsedUrl.href))}</div>
            <div><strong>origin</strong></div>
            <div>{parsedUrl.origin}</div>
            <div><strong>protocol</strong></div>
            <div>{parsedUrl.protocol}</div>
            <div><strong>username</strong></div>
            <div>{renderWithDecoded(parsedUrl.username || '—', safeDecodeURIComponent(parsedUrl.username))}</div>
            <div><strong>password</strong></div>
            <div>{parsedUrl.password ? '••••••' : '—'}</div>
            <div><strong>host</strong></div>
            <div>{parsedUrl.host}</div>
            <div><strong>hostname</strong></div>
            <div>{parsedUrl.hostname}</div>
            <div><strong>port</strong></div>
            <div>{parsedUrl.port || '—'}</div>
            <div><strong>pathname</strong></div>
            <div>{renderWithDecoded(parsedUrl.pathname || '/', safeDecodeURI(parsedUrl.pathname || '/'))}</div>
            <div><strong>search</strong></div>
            <div>{renderWithDecoded(parsedUrl.search || '—', parsedUrl.search ? `?${safeDecodeURIComponent(parsedUrl.search.slice(1))}` : '—')}</div>
            <div><strong>hash</strong></div>
            <div>{renderWithDecoded(parsedUrl.hash || '—', parsedUrl.hash ? `#${safeDecodeURIComponent(parsedUrl.hash.slice(1))}` : '—')}</div>
          </div>

          {Array.from(parsedUrl.searchParams.entries()).length > 0 && (
            <div style={{ marginTop: 10 }}>
              <ResultLabel>Query Parameters</ResultLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 6, columnGap: 10 }}>
                {Array.from(parsedUrl.searchParams.entries()).map(([key, value], idx) => (
                  <>
                    <div key={`k-${idx}`}><strong>{key}</strong></div>
                    <div key={`v-${idx}`}>{value}</div>
                  </>
                ))}
              </div>
            </div>
          )}
        </Result>
      )}

      {parseError && text && (
        <Result>
          <ResultLabel>Parse Error</ResultLabel>
          <div>{parseError}</div>
        </Result>
      )}
      {maybeShowEncoded()}
    </ToolCard>
  );
}

export default URLEncoderDecoder;

