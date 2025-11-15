import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none cursor-pointer';

  // Primary button (default variant)
  const primaryClasses = disabled
    ? 'bg-[#5B3700] text-[#8B6B4A]'
    : 'bg-[#F39200] text-black hover:bg-[#FFBB54] active:bg-[#FF9F0F]';

  // Secondary button (outline variant with transparent background)
  const secondaryClasses = disabled
    ? 'bg-transparent border border-[#5B3700] text-[#5B3700]'
    : 'bg-transparent border border-[#FFFFFF] text-[#FFFFFF] hover:border-[#FFBB54] hover:text-[#FFBB54] active:border-[#FFFFFF] active:text-[#FFFFFF]';

  // Legacy outline variant (orange border) - keeping for backward compatibility
  const outlineClasses = disabled
    ? 'bg-[#1A1A1A] border border-[#5B3700] text-[#5B3700]'
    : 'border border-[#F39200] text-[#F39200] hover:bg-[#F39200] hover:text-black active:bg-[#FF9F0F]';

  const variantClasses = {
    default: primaryClasses,
    secondary: secondaryClasses,
    outline: outlineClasses,
  };

  const sizeClasses = {
    default: 'h-11 py-3 px-6 text-base', // Large size
    sm: 'h-9 py-2 px-4 text-sm', // Small size
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}; 