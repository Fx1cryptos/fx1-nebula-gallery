import React from 'react';
import { Button3D } from '@/components/ui/Button3D';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface TaskCardProps {
  title: string;
  description: string;
  icon: string;
  reward: number;
  completed: boolean;
  onClaim: () => void;
  link: string;
}

export function TaskCard({ title, description, icon, reward, completed, onClaim, link }: TaskCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group relative bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 rounded-xl p-6 hover:shadow-glow transition-all duration-300">
      <div className="flex items-center space-x-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground">{title}</h3>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <div className="flex justify-between items-center gap-3">
        <Badge className="bg-accent/20 text-accent-foreground border border-accent/30">
          +{reward} $FDH
        </Badge>
        
        {completed ? (
          <div className="flex items-center gap-2 text-green-500 font-semibold text-sm">
            <span>✅</span>
            <span>Completed</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button3D variant="social" size="sm" onClick={handleClick}>
              Visit
            </Button3D>
            <Button3D variant="hero" size="sm" onClick={onClaim}>
              Claim
            </Button3D>
          </div>
        )}
      </div>
    </div>
  );
}
