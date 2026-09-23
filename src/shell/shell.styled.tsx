/**
 * The shell's styles.
 *
 * One `.styled.tsx` beside every file that renders, so a component file reads
 * as structure and this one as appearance. Neither needs the other open.
 */
import { createGlobalStyle, styled } from '@firsthandjs/styled';
import { NavLink } from '@firsthandjs/router';

/**
 * Attached while the component is mounted, replaced when the theme changes.
 * Two instances share one rule, refcounted, so this is safe to mount twice.
 */
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font: 16px/1.65 ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  ::selection { background: ${(props) => props.theme.accent}; color: #fff; }
`;

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem clamp(1rem, 5vw, 3rem);
  border-bottom: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.surface};
`;

export const Brand = styled.span`
  font-weight: 650;
  letter-spacing: -0.01em;
  margin-right: auto;
  /* The dot is the only decoration in the whole starter. Earn the next one. */
  &::after {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-left: 6px;
    border-radius: 50%;
    background: ${(props) => props.theme.accent};
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.25rem;
`;

/**
 * `styled(NavLink)` wraps the router's link rather than an anchor, so the
 * active class it adds is still there to style.
 */
export const Tab = styled(NavLink)`
  color: ${(props) => props.theme.muted};
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: color 120ms ease;
  &:hover {
    color: ${(props) => props.theme.text};
  }
  &.active {
    color: ${(props) => props.theme.text};
    border-bottom-color: ${(props) => props.theme.accent};
  }
`;

export const LanguageButton = styled.button`
  font: inherit;
  font-size: 0.875rem;
  color: ${(props) => props.theme.muted};
  background: transparent;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 999px;
  padding: 0.15rem 0.75rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.text};
    border-color: ${(props) => props.theme.muted};
  }
`;

export const Main = styled.main`
  width: 100%;
  max-width: 44rem;
  padding: clamp(2rem, 6vw, 4.5rem) clamp(1rem, 5vw, 3rem) 4rem;
`;
