import { navItems, type NavKey } from './nav';

type DesktopNavProps = {
  active: NavKey;
  onNav: (key: NavKey) => void;
};

export function DesktopNav({ active, onNav }: DesktopNavProps) {
  const desktopClass = (name: NavKey) =>
    name === active
      ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-1'
      : 'text-slate-700 hover:text-sky-600 transition-colors font-medium';

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <a
          key={item.key}
          href={item.href}
          onClick={() => onNav(item.key)}
          className={desktopClass(item.key)}
          aria-current={active === item.key ? 'page' : undefined}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
