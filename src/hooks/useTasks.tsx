import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  reward: number;
  completed: boolean;
}

const defaultTasks: Task[] = [
  {
    id: 'task-x-follow',
    title: 'Follow FX1 on X',
    description: 'Click to follow @fx1_hubs on X and earn $FDH',
    icon: '𝕏',
    link: 'https://x.com/fx1_hubs?s=21',
    reward: 10,
    completed: false
  },
  {
    id: 'task-farcaster-follow',
    title: 'Follow FX1 on Farcaster',
    description: 'Follow FX1 on Farcaster to stay updated',
    icon: '🟣',
    link: 'https://warpcast.com/fx1',
    reward: 10,
    completed: false
  },
  {
    id: 'task-discord-join',
    title: 'Join Discord',
    description: 'Join the FX1 community on Discord',
    icon: '💬',
    link: 'https://discord.gg/fx1hubs',
    reward: 15,
    completed: false
  },
  {
    id: 'task-telegram-join',
    title: 'Join Telegram',
    description: 'Connect with the FX1 community on Telegram',
    icon: '✈️',
    link: 'https://t.me/fx1hubs',
    reward: 15,
    completed: false
  },
  {
    id: 'task-x-retweet',
    title: 'Retweet Launch Post',
    description: 'Retweet our latest announcement',
    icon: '🔄',
    link: 'https://x.com/fx1_hubs',
    reward: 20,
    completed: false
  }
];

export function useTasks(walletAddress: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [streak, setStreak] = useState<number>(0);
  const [totalRewards, setTotalRewards] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (walletAddress) {
      loadUserProgress();
    } else {
      setLoading(false);
    }
  }, [walletAddress]);

  const loadUserProgress = async () => {
    if (!walletAddress) return;
    
    try {
      const { data, error } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('wallet_address', walletAddress.toLowerCase())
        .single();

      if (data) {
        const completedTaskIds = data.completed_tasks || [];
        const updatedTasks = defaultTasks.map(task => ({
          ...task,
          completed: completedTaskIds.includes(task.id)
        }));
        setTasks(updatedTasks);
        setStreak(data.streak || 0);
        setTotalRewards(data.total_rewards || 0);
      }
    } catch (error) {
      console.log('No existing progress found, starting fresh');
    } finally {
      setLoading(false);
    }
  };

  const claimTask = async (taskId: string) => {
    if (!walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to claim rewards",
        variant: "destructive"
      });
      return;
    }

    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    try {
      const updatedTasks = tasks.map(t => 
        t.id === taskId ? { ...t, completed: true } : t
      );
      
      const completedTaskIds = updatedTasks.filter(t => t.completed).map(t => t.id);
      const newTotalRewards = totalRewards + task.reward;
      const newStreak = streak + 1;

      const { error } = await supabase
        .from('user_tasks')
        .upsert({
          wallet_address: walletAddress.toLowerCase(),
          completed_tasks: completedTaskIds,
          streak: newStreak,
          total_rewards: newTotalRewards,
          last_claim_at: new Date().toISOString()
        });

      if (error) throw error;

      setTasks(updatedTasks);
      setStreak(newStreak);
      setTotalRewards(newTotalRewards);

      toast({
        title: "🎉 Reward Claimed!",
        description: `+${task.reward} $FDH earned! Streak: ${newStreak} days`,
      });
    } catch (error) {
      console.error('Error claiming task:', error);
      toast({
        title: "Error",
        description: "Failed to claim reward. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { tasks, streak, totalRewards, loading, claimTask };
}
