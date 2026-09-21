/** The facts panel's appearance. Structure is in `facts.tsx`. */
import { styled } from '@firsthandjs/styled';

export const Panel = styled.section`
  margin: 0 0 2.5rem;
  padding: 1.5rem;
  max-width: 34rem;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 12px;
`;

export const Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

export const Heading = styled.h2`
  font-size: 1rem;
  font-weight: 650;
  margin: 0 auto 0 0;
`;

/**
 * Dimmed while a reload is in flight, which is the point of keeping `status`
 * and `loading` apart: the old list stays readable instead of being replaced
 * by a spinner.
 */
export const List = styled.ul<{ $stale?: boolean }>`
  --fact-opacity: ${(props) => (props.$stale === true ? '0.55' : '1')};
  opacity: var(--fact-opacity);
  transition: opacity 120ms ease-out;
  margin: 0;
  padding-left: 1.2rem;
  line-height: 1.55;
`;

export const Fact = styled.li`
  margin: 0 0 0.35rem;
`;

export const Button = styled.button`
  font: inherit;
  line-height: 1;
  padding: 0.45rem 0.8rem;
  color: ${(props) => props.theme.text};
  background: transparent;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    cursor: progress;
    opacity: 0.6;
  }
`;

export const Note = styled.p`
  color: ${(props) => props.theme.muted};
  font-size: 0.9rem;
  margin: 0.9rem 0 0;
`;

export const Failure = styled.p`
  color: ${(props) => props.theme.text};
  margin: 0;
`;
