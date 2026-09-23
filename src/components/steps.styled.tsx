/** The three screens' appearance. Structure is in `steps.tsx`. */
import { styled } from '@firsthandjs/styled';

export const Panel = styled.section`
  margin: 0 0 2.5rem;
  padding: 1.5rem;
  max-width: 34rem;
  background: ${(props) => props.theme.surface};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 12px;
`;

export const Screen = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

export const Question = styled.p`
  margin: 0 auto 0 0;
  font-weight: 600;
`;

/** An answer. `$on` marks the one already chosen, which is how stepping back shows. */
export const Choice = styled.button<{ $on?: boolean }>`
  font: inherit;
  line-height: 1;
  padding: 0.45rem 0.85rem;
  color: ${(props) => (props.$on === true ? props.theme.surface : props.theme.text)};
  background: ${(props) => (props.$on === true ? props.theme.text : 'transparent')};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  cursor: pointer;
`;

/** Back, and start again: movement rather than an answer. */
export const Plain = styled.button`
  font: inherit;
  font-size: 0.875rem;
  padding: 0;
  color: ${(props) => props.theme.muted};
  background: none;
  border: 0;
  border-bottom: 1px solid currentColor;
  cursor: pointer;
`;
