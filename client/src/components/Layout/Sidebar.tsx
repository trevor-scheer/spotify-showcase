import { forwardRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import cx from 'classnames';
import ApolloLogo from '../ApolloLogo';
import NavLink from './NavLink';

interface SidebarProps {
  children?: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className="[grid-area:sidebar] bg-black-pure text-primary overflow-auto pt-4 px-2 pb-0">
      <nav className="h-full flex flex-col">
        <Link to="/" className="flex justify-center py-2">
          <ApolloLogo size="225px" className="relative -left-3" />
        </Link>
        <Section>
          <NavLink icon={<Home />} to="/">
            Home
          </NavLink>
          <NavLink icon={<Search />} to="/search">
            Search
          </NavLink>
        </Section>
        {children}
      </nav>
    </aside>
  );
};

interface SectionProps {
  className?: string;
  children?: ReactNode;
}

const Section = forwardRef<HTMLUListElement, SectionProps>(
  ({ className, children }, ref) => (
    <ul
      ref={ref}
      className={cx(
        'list-none px-4 py-2 rounded bg-surface-low-contrast mt-2 first:mt-0',
        className
      )}
    >
      {children}
    </ul>
  )
);

Sidebar.Section = Section;
Sidebar.NavLink = NavLink;

export default Sidebar;
