import { Home, Plane, CheckCircle, Luggage, Send } from 'lucide-react';

export type NavKey = 'home' | 'flights' | 'checkin' | 'manage' | 'contact';

export const navItems: {
  key: NavKey;
  label: string;
  href: `#${string}`;
  mobile: { label: string; Icon: React.ComponentType<{ className?: string }> };
}[] = [
  { key: 'home', label: 'Home', href: '#home', mobile: { label: 'Home', Icon: Home } },
  { key: 'flights', label: 'Flights', href: '#flights', mobile: { label: 'Flights', Icon: Plane } },
  { key: 'checkin', label: 'Check-in', href: '#checkin', mobile: { label: 'Check-in', Icon: CheckCircle } },
  { key: 'manage', label: 'Manage Booking', href: '#manage', mobile: { label: 'Booking', Icon: Luggage } },
  { key: 'contact', label: 'Contact', href: '#contact', mobile: { label: 'Contact', Icon: Send } },
];
