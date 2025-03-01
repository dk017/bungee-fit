declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';

    interface IconProps extends SVGProps<SVGSVGElement> {
      size?: number | string;
      color?: string;
      strokeWidth?: number;
    }

    export const MapPin: FC<IconProps>;
    export const Phone: FC<IconProps>;
    export const Mail: FC<IconProps>;
    export const Globe: FC<IconProps>;
    export const Users: FC<IconProps>;
    export const Clock: FC<IconProps>;
    export const Star: FC<IconProps>;
    export const Dumbbell: FC<IconProps>;
    export const Instagram: FC<IconProps>;
    export const Facebook: FC<IconProps>;
    export const Youtube: FC<IconProps>;
    export const ChevronRight: FC<IconProps>;
    export const ChevronDown: FC<IconProps>;
    export const ChevronLeft: FC<IconProps>;
    export const ChevronRightIcon: FC<IconProps>;
    export const ChevronLeftIcon: FC<IconProps>;
    export const ChevronUp: FC<IconProps>;
    export const CalendarDays: FC<IconProps>;
    export const Send: FC<IconProps>;
    export const X: FC<IconProps>;
    export const Navigation: FC<IconProps>;
  }
