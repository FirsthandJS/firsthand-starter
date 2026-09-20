/** The home page's appearance. Structure is in `home.tsx`. */
import { styled } from '@firsthandjs/styled';

export const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: clamp(2rem, 6vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 680;
`;

export const Lead = styled.p`
  margin: 0 0 2rem;
  font-size: 1.15rem;
  color: ${(props) => props.theme.muted};
  max-width: 34rem;
`;

export const Body = styled.p`
  margin: 0 0 2.5rem;
  max-width: 34rem;
`;

export const Aside = styled.aside`
  border-left: 2px solid ${(props) => props.theme.accent};
  padding: 0.25rem 0 0.25rem 1rem;
  color: ${(props) => props.theme.muted};
  font-style: italic;
`;
