import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shirt, Coins, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function WearToEarn() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [wearables, setWearables] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadWearables();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadWearables();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadWearables = async () => {
    const { data, error } = await supabase
      .from('wearables')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading wearables:', error);
    } else {
      setWearables(data || []);
    }
  };

  const handleEquip = async (wearableId: string, currentlyEquipped: boolean) => {
    const { error } = await supabase
      .from('wearables')
      .update({ is_equipped: !currentlyEquipped })
      .eq('id', wearableId);

    if (error) {
      toast.error('Failed to update wearable');
    } else {
      toast.success(currentlyEquipped ? 'Wearable unequipped' : 'Wearable equipped');
      loadWearables();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            FX1 Wear to Earn
          </h1>
          <Button3D variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button3D>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Shirt className="w-10 h-10 text-primary" />
              <h1 className="text-5xl font-bold gradient-text">Wear to Earn</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Equip wearable NFTs and earn $FDH rewards
            </p>
          </div>

          <Card className="p-8 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border-primary/30">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Your Total Earnings</p>
              <p className="text-5xl font-bold gradient-text">
                {wearables.reduce((sum, w) => sum + parseFloat(w.earnings || '0'), 0).toFixed(2)} $FDH
              </p>
            </div>
          </Card>

          <div>
            <h2 className="text-3xl font-bold mb-6">Your Wearables</h2>
            {wearables.length === 0 ? (
              <Card className="p-12 text-center bg-card/80 backdrop-blur-sm">
                <Shirt className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground mb-4">
                  You don't have any wearables yet
                </p>
                <Button3D variant="hero" onClick={() => navigate('/gallery')}>
                  Browse Marketplace
                </Button3D>
              </Card>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {wearables.map((wearable) => (
                  <Card key={wearable.id} className="overflow-hidden bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all">
                    <div className="aspect-square relative">
                      <img
                        src={wearable.image_url}
                        alt={wearable.name}
                        className="w-full h-full object-cover"
                      />
                      {wearable.is_equipped && (
                        <Badge className="absolute top-4 right-4 bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Equipped
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-lg">{wearable.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Earnings</span>
                        <div className="flex items-center space-x-1">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold">{wearable.earnings} $FDH</span>
                        </div>
                      </div>
                      <Button3D
                        variant={wearable.is_equipped ? 'nft' : 'hero'}
                        className="w-full"
                        onClick={() => handleEquip(wearable.id, wearable.is_equipped)}
                      >
                        {wearable.is_equipped ? 'Unequip' : 'Equip'}
                      </Button3D>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
