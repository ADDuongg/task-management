/* eslint-disable @typescript-eslint/no-explicit-any */
interface IconProps {
  IconComponent: React.ComponentType;
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;  
  props?: any;
}

export const Icon: React.FC<IconProps> = ({
  IconComponent,
  size = 33,
  color,
  className,
  onClick,  
  props,
}) => {
  return (
    <span
      className={className}
      style={{ fontSize: size, color: `var(--color-${color})` }}
      onClick={onClick}  
      {...props}
    >
      <IconComponent />
    </span>
  );
};
