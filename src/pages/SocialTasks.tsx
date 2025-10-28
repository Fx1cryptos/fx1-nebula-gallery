import React from 'react';
import { TaskCard } from '@/components/TaskCard';
import { StreakMeter } from '@/components/StreakMeter';
import { useTasks } from '@/hooks/useTasks';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ArrowLeft, Trophy, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';

export default function SocialTasks() {
  const { address } = useAccount();
  const { tasks, streak, totalRewards, loading, claimTask } = useTasks(address);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button3D variant="social" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button3D>
          </Link>
          <ConnectButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Social Tasks
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete social tasks, build your streak, and earn $FDH rewards! 🚀
          </p>
        </div>

        {!address ? (
          <Card className="max-w-md mx-auto p-8 text-center bg-card/80 backdrop-blur-sm">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground mb-6">
              Connect your Base wallet to start earning rewards
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </Card>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 border border-primary/30">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    <p className="text-2xl font-bold text-foreground">
                      {completedCount}/{totalCount}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-accent/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-accent/10 border border-accent/30">
                    <Coins className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Rewards</p>
                    <p className="text-2xl font-bold text-foreground">
                      {totalRewards} $FDH
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-orange-500/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-orange-500/10 border border-orange-500/30">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold text-foreground">
                      {streak} Days
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Streak Meter */}
            <StreakMeter currentStreak={streak} />

            {/* Tasks Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {tasks.map(task => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onClaim={() => claimTask(task.id)}
                />
              ))}
            </div>

            {/* Footer Info */}
            <Card className="mt-12 p-6 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="text-xl font-bold mb-4 text-foreground">How It Works</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>1. Connect your Base wallet to get started</p>
                <p>2. Complete social tasks by visiting the links</p>
                <p>3. Click "Claim" to earn your $FDH rewards</p>
                <p>4. Build your daily streak for bonus multipliers</p>
                <p>5. Use rewards to unlock exclusive NFTs and features</p>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
