import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Button3DProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'hero' | 'wallet' | 'nft' | 'creator' | 'social';
}

export const Button3D: React.FC<Button3DProps> = ({ 
  className, 
  variant = 'hero', 
  children, 
  ...props 
}) => {
  const variantStyles = {
    hero: "bg-gradient-primary hover:bg-gradient-to-r hover:from-primary-glow hover:to-accent border-0 text-primary-foreground shadow-glow hover:shadow-neon transform hover:scale-105 transition-all duration-300",
    wallet: "bg-secondary/50 backdrop-blur-sm border border-primary/30 hover:border-primary text-foreground hover:bg-secondary shadow-glow hover:shadow-neon",
    nft: "bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 text-card-foreground hover:bg-card/90 shadow-card hover:shadow-glow",
    creator: "bg-accent/20 backdrop-blur-sm border border-accent/30 hover:border-accent text-accent-foreground hover:bg-accent/30 shadow-glow",
    social: "bg-muted/30 backdrop-blur-sm border border-muted-foreground/20 hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
  };

  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300 font-medium tracking-wide",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:transform before:-skew-x-12 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};