import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button3D } from '@/components/ui/Button3D';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Repeat2, Send, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Social() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadPosts();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadPosts();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (username, avatar_url)
      `)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error loading posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  const createPost = async () => {
    if (!newPost.trim()) {
      toast.error('Please enter some content');
      return;
    }

    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        content: newPost,
        image_url: imageUrl || null
      });

    if (error) {
      toast.error('Failed to create post');
    } else {
      toast.success('Post created! +10 $FDH earned');
      
      // Award social task
      await supabase.from('social_tasks').insert({
        user_id: user.id,
        task_type: 'post',
        fdh_reward: 10
      });

      setNewPost('');
      setImageUrl('');
      loadPosts();
    }
  };

  const toggleLike = async (postId: string) => {
    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();

    if (existingLike) {
      await supabase.from('post_likes').delete().eq('id', existingLike.id);
      toast.success('Unliked');
    } else {
      await supabase.from('post_likes').insert({
        post_id: postId,
        user_id: user.id
      });
      
      await supabase.from('social_tasks').insert({
        user_id: user.id,
        task_type: 'like',
        fdh_reward: 1
      });
      
      toast.success('Liked! +1 $FDH earned');
    }

    loadPosts();
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text cursor-pointer" onClick={() => navigate('/')}>
            FX1 Social Hub
          </h1>
          <Button3D variant="hero" onClick={() => navigate('/')}>
            Back to Home
          </Button3D>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Create Post */}
        <Card className="p-6 mb-8 bg-card/80 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4">Create Post</h2>
          <Textarea
            placeholder="Share your thoughts, NFT finds, or wardrobe looks..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="mb-4 min-h-32 bg-background/50"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="px-3 py-2 rounded bg-background/50 border border-border text-sm"
              />
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <Button3D variant="hero" onClick={createPost}>
              <Send className="w-4 h-4 mr-2" />
              Post (+10 $FDH)
            </Button3D>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="p-6 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all">
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <img src={post.profiles?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg'} alt="Avatar" />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">{post.profiles?.username || 'Anonymous'}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-foreground mb-4">{post.content}</p>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt="Post"
                      className="rounded-lg mb-4 max-h-96 object-cover w-full"
                    />
                  )}
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{post.likes_count || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments_count || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                      <Repeat2 className="w-5 h-5" />
                      <span>{post.reposts_count || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
