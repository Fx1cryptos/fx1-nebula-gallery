export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      arena_battles: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_active: boolean | null
          start_date: string
          theme: string
          week_number: number
          year: number
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          start_date: string
          theme: string
          week_number: number
          year: number
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          start_date?: string
          theme?: string
          week_number?: number
          year?: number
        }
        Relationships: []
      }
      arena_submissions: {
        Row: {
          battle_id: string
          created_at: string | null
          id: string
          image_url: string
          outfit_description: string
          user_id: string
          votes_count: number | null
          wearable_ids: string[]
        }
        Insert: {
          battle_id: string
          created_at?: string | null
          id?: string
          image_url: string
          outfit_description: string
          user_id: string
          votes_count?: number | null
          wearable_ids: string[]
        }
        Update: {
          battle_id?: string
          created_at?: string | null
          id?: string
          image_url?: string
          outfit_description?: string
          user_id?: string
          votes_count?: number | null
          wearable_ids?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "arena_submissions_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "arena_battles"
            referencedColumns: ["id"]
          },
        ]
      }
      arena_votes: {
        Row: {
          created_at: string | null
          id: string
          submission_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          submission_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          submission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "arena_votes_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "arena_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          created_at: string | null
          description: string
          fdh_reward: number | null
          icon: string
          id: string
          name: string
          requirement: Json
        }
        Insert: {
          created_at?: string | null
          description: string
          fdh_reward?: number | null
          icon: string
          id?: string
          name: string
          requirement: Json
        }
        Update: {
          created_at?: string | null
          description?: string
          fdh_reward?: number | null
          icon?: string
          id?: string
          name?: string
          requirement?: Json
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_login_date: string | null
          longest_streak: number | null
          total_fdh_earned: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_login_date?: string | null
          longest_streak?: number | null
          total_fdh_earned?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_login_date?: string | null
          longest_streak?: number | null
          total_fdh_earned?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      fashion_quests: {
        Row: {
          created_at: string | null
          description: string
          end_date: string
          fdh_reward: number
          id: string
          is_active: boolean | null
          quest_type: string
          requirements: Json
          start_date: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          end_date: string
          fdh_reward: number
          id?: string
          is_active?: boolean | null
          quest_type: string
          requirements: Json
          start_date: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          end_date?: string
          fdh_reward?: number
          id?: string
          is_active?: boolean | null
          quest_type?: string
          requirements?: Json
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      fashion_runway_submissions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          is_winner: boolean | null
          title: string
          updated_at: string | null
          user_id: string
          votes: number | null
          wearable_id: string | null
          week_number: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          is_winner?: boolean | null
          title: string
          updated_at?: string | null
          user_id: string
          votes?: number | null
          wearable_id?: string | null
          week_number: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          is_winner?: boolean | null
          title?: string
          updated_at?: string | null
          user_id?: string
          votes?: number | null
          wearable_id?: string | null
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "fashion_runway_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fashion_runway_submissions_wearable_id_fkey"
            columns: ["wearable_id"]
            isOneToOne: false
            referencedRelation: "wearables"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard_entries: {
        Row: {
          category: string
          created_at: string | null
          id: string
          rank: number | null
          reward_claimed: boolean | null
          score: number
          updated_at: string | null
          user_id: string
          week_number: number
          year: number
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          rank?: number | null
          reward_claimed?: boolean | null
          score: number
          updated_at?: string | null
          user_id: string
          week_number: number
          year: number
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          rank?: number | null
          reward_claimed?: boolean | null
          score?: number
          updated_at?: string | null
          user_id?: string
          week_number?: number
          year?: number
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          nft_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nft_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nft_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nfts: {
        Row: {
          chain: string | null
          contract_address: string | null
          created_at: string | null
          creator_id: string
          description: string | null
          id: string
          image_url: string
          metadata: Json | null
          price: number | null
          title: string
          token_id: string | null
          updated_at: string | null
        }
        Insert: {
          chain?: string | null
          contract_address?: string | null
          created_at?: string | null
          creator_id: string
          description?: string | null
          id?: string
          image_url: string
          metadata?: Json | null
          price?: number | null
          title: string
          token_id?: string | null
          updated_at?: string | null
        }
        Update: {
          chain?: string | null
          contract_address?: string | null
          created_at?: string | null
          creator_id?: string
          description?: string | null
          id?: string
          image_url?: string
          metadata?: Json | null
          price?: number | null
          title?: string
          token_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfts_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          comments_count: number | null
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          likes_count: number | null
          nft_id: string | null
          reposts_count: number | null
          updated_at: string | null
          user_id: string
          wearable_id: string | null
        }
        Insert: {
          comments_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          likes_count?: number | null
          nft_id?: string | null
          reposts_count?: number | null
          updated_at?: string | null
          user_id: string
          wearable_id?: string | null
        }
        Update: {
          comments_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          likes_count?: number | null
          nft_id?: string | null
          reposts_count?: number | null
          updated_at?: string | null
          user_id?: string
          wearable_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_wearable_id_fkey"
            columns: ["wearable_id"]
            isOneToOne: false
            referencedRelation: "wearables"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      quest_completions: {
        Row: {
          completed_at: string | null
          id: string
          quest_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          quest_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          quest_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quest_completions_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "fashion_quests"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          claimed_at: string | null
          created_at: string | null
          id: string
          is_claimed: boolean | null
          referee_id: string | null
          referral_code: string
          referrer_id: string
          reward_amount: number | null
        }
        Insert: {
          claimed_at?: string | null
          created_at?: string | null
          id?: string
          is_claimed?: boolean | null
          referee_id?: string | null
          referral_code: string
          referrer_id: string
          reward_amount?: number | null
        }
        Update: {
          claimed_at?: string | null
          created_at?: string | null
          id?: string
          is_claimed?: boolean | null
          referee_id?: string | null
          referral_code?: string
          referrer_id?: string
          reward_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reposts: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reposts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      social_tasks: {
        Row: {
          completed_at: string | null
          created_at: string | null
          fdh_reward: number
          id: string
          task_type: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          fdh_reward: number
          id?: string
          task_type: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          fdh_reward?: number
          id?: string
          task_type?: string
          user_id?: string
        }
        Relationships: []
      }
      staking: {
        Row: {
          created_at: string | null
          id: string
          last_claim_at: string | null
          rewards_earned: number | null
          staked_amount: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_claim_at?: string | null
          rewards_earned?: number | null
          staked_amount?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_claim_at?: string | null
          rewards_earned?: number | null
          staked_amount?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          created_at: string | null
          id: string
          level: number | null
          style_points: number | null
          total_fdh_earned: number | null
          total_followers: number | null
          total_likes_received: number | null
          total_posts: number | null
          updated_at: string | null
          user_id: string
          xp: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          level?: number | null
          style_points?: number | null
          total_fdh_earned?: number | null
          total_followers?: number | null
          total_likes_received?: number | null
          total_posts?: number | null
          updated_at?: string | null
          user_id: string
          xp?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          level?: number | null
          style_points?: number | null
          total_fdh_earned?: number | null
          total_followers?: number | null
          total_likes_received?: number | null
          total_posts?: number | null
          updated_at?: string | null
          user_id?: string
          xp?: number | null
        }
        Relationships: []
      }
      wardrobe_boxes: {
        Row: {
          box_type: string
          created_at: string | null
          id: string
          is_opened: boolean | null
          opened_at: string | null
          reward_nft_id: string | null
          user_id: string
        }
        Insert: {
          box_type: string
          created_at?: string | null
          id?: string
          is_opened?: boolean | null
          opened_at?: string | null
          reward_nft_id?: string | null
          user_id: string
        }
        Update: {
          box_type?: string
          created_at?: string | null
          id?: string
          is_opened?: boolean | null
          opened_at?: string | null
          reward_nft_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wardrobe_boxes_reward_nft_id_fkey"
            columns: ["reward_nft_id"]
            isOneToOne: false
            referencedRelation: "wearables"
            referencedColumns: ["id"]
          },
        ]
      }
      wearables: {
        Row: {
          contract_address: string
          created_at: string | null
          earnings: number | null
          id: string
          image_url: string
          is_equipped: boolean | null
          name: string
          nft_id: string | null
          owner_id: string
          token_id: string
          updated_at: string | null
        }
        Insert: {
          contract_address: string
          created_at?: string | null
          earnings?: number | null
          id?: string
          image_url: string
          is_equipped?: boolean | null
          name: string
          nft_id?: string | null
          owner_id: string
          token_id: string
          updated_at?: string | null
        }
        Update: {
          contract_address?: string
          created_at?: string | null
          earnings?: number | null
          id?: string
          image_url?: string
          is_equipped?: boolean | null
          name?: string
          nft_id?: string | null
          owner_id?: string
          token_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wearables_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wearables_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
