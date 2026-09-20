/** The counter's appearance. Structure is in `counter.tsx`. */
import { styled } from '@firsthandjs/styled';

export const Panel = styled.section`
  margin: 0 0 2.5rem;
  padding: 1.5rem;
  max-width: 34rem;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 12px;
`;

export const Row = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

export const Value = styled.output`
  font-variant-numeric: tabular-nums;
  font-size: 2.5rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  min-width: 3ch;
`;

export const Parity = styled.span`
  color: ${(props) => props.theme.muted};
  margin-right: auto;
`;

/**
 * `$quiet` never reaches the DOM: a `$`-prefixed prop is for the style and
 * the element never sees it. The interpolation produces a value, so both
 * kinds of button share one rule and differ by one custom property.
 */
export const Button = styled.button<{ $quiet?: boolean }>`
  font: inherit;
  font-size: 1.1rem;
  line-height: 1;
  width: 2.5rem;
  height: 2.5rem;
  color: ${(props) => (props.$quiet === true ? props.theme.muted : props.theme.text)};
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  cursor: pointer;
  transition:
    border-color 120ms ease,
    color 120ms ease;
  &:hover {
    border-color: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.accent};
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const Reset = styled(Button)`
  width: auto;
  padding: 0 0.85rem;
  font-size: 0.9rem;
`;

export const Note = styled.p`
  margin: 1.25rem 0 0;
  color: ${(props) => props.theme.muted};
  font-size: 0.9rem;
`;
