/** The about page's appearance. Structure is in `about.tsx`. */
import { styled } from '@firsthandjs/styled';

export const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  line-height: 1.15;
  letter-spacing: -0.025em;
  font-weight: 680;
`;

export const Lead = styled.p`
  margin: 0 0 2.5rem;
  font-size: 1.1rem;
  color: ${(props) => props.theme.muted};
  max-width: 34rem;
`;

export const List = styled.dl`
  margin: 0 0 2.5rem;
  display: grid;
  gap: 1.25rem;
`;

export const Package = styled.dt`
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9rem;
  color: ${(props) => props.theme.accent};
`;

export const What = styled.dd`
  margin: 0.15rem 0 0;
  max-width: 34rem;
`;

export const Footer = styled.p`
  margin: 0;
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.muted};
  font-size: 0.925rem;
`;
