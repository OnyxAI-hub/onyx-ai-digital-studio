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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      asset_manager: {
        Row: {
          asset_type: string | null
          created_at: string
          file_url: string | null
          id: string
          metadata: Json | null
          name: string
          size_bytes: number | null
          source: string | null
          thumbnail_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          asset_type?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          name: string
          size_bytes?: number | null
          source?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          asset_type?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          size_bytes?: number | null
          source?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_claps: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_claps_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_name: string | null
          body: string | null
          category: string | null
          cover_gradient: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean
          published_at: string | null
          read_time: string | null
          slug: string
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_name?: string | null
          body?: string | null
          category?: string | null
          cover_gradient?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          read_time?: string | null
          slug: string
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_name?: string | null
          body?: string | null
          category?: string | null
          cover_gradient?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          read_time?: string | null
          slug?: string
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      challenge_entries: {
        Row: {
          asset_url: string | null
          challenge_id: string
          created_at: string
          id: string
          title: string | null
          user_id: string
          votes: number
        }
        Insert: {
          asset_url?: string | null
          challenge_id: string
          created_at?: string
          id?: string
          title?: string | null
          user_id: string
          votes?: number
        }
        Update: {
          asset_url?: string | null
          challenge_id?: string
          created_at?: string
          id?: string
          title?: string | null
          user_id?: string
          votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "challenge_entries_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          banner_gradient: string | null
          created_at: string
          ends_at: string | null
          id: string
          prize: string | null
          starts_at: string | null
          status: string
          theme: string | null
          title: string
          updated_at: string
          vote_reward: number | null
        }
        Insert: {
          banner_gradient?: string | null
          created_at?: string
          ends_at?: string | null
          id?: string
          prize?: string | null
          starts_at?: string | null
          status?: string
          theme?: string | null
          title: string
          updated_at?: string
          vote_reward?: number | null
        }
        Update: {
          banner_gradient?: string | null
          created_at?: string
          ends_at?: string | null
          id?: string
          prize?: string | null
          starts_at?: string | null
          status?: string
          theme?: string | null
          title?: string
          updated_at?: string
          vote_reward?: number | null
        }
        Relationships: []
      }
      creative_requests: {
        Row: {
          admin_notes: string | null
          created_at: string
          delivery_url: string | null
          estimated_credits: number
          id: string
          platform_use: string | null
          prompt: string
          reference_url: string | null
          request_type: string
          status: string
          style: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          delivery_url?: string | null
          estimated_credits?: number
          id?: string
          platform_use?: string | null
          prompt: string
          reference_url?: string | null
          request_type: string
          status?: string
          style?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          delivery_url?: string | null
          estimated_credits?: number
          id?: string
          platform_use?: string | null
          prompt?: string
          reference_url?: string | null
          request_type?: string
          status?: string
          style?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "creative_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_balances: {
        Row: {
          balance: number
          bonus_credits: number
          id: string
          monthly_credits: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          bonus_credits?: number
          id?: string
          monthly_credits?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          bonus_credits?: number
          id?: string
          monthly_credits?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_balances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          related_request_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          related_request_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          related_request_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_rewards: {
        Row: {
          created_at: string
          credits: number
          description: string | null
          id: string
          is_active: boolean
          reward_key: string
          reward_type: string
          sort_order: number
          title: string
        }
        Insert: {
          created_at?: string
          credits?: number
          description?: string | null
          id?: string
          is_active?: boolean
          reward_key: string
          reward_type?: string
          sort_order?: number
          title: string
        }
        Update: {
          created_at?: string
          credits?: number
          description?: string | null
          id?: string
          is_active?: boolean
          reward_key?: string
          reward_type?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          category: string | null
          created_at: string
          gradient: string | null
          id: string
          is_featured: boolean
          media_url: string | null
          model_name: string | null
          sort_order: number
          span: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          gradient?: string | null
          id?: string
          is_featured?: boolean
          media_url?: string | null
          model_name?: string | null
          sort_order?: number
          span?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          gradient?: string | null
          id?: string
          is_featured?: boolean
          media_url?: string | null
          model_name?: string | null
          sort_order?: number
          span?: string | null
          title?: string
        }
        Relationships: []
      }
      generation_history: {
        Row: {
          created_at: string
          credits_used: number
          error_message: string | null
          generation_type: string
          id: string
          model_name: string
          output_url: string | null
          prompt: string | null
          request_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_used?: number
          error_message?: string | null
          generation_type: string
          id?: string
          model_name: string
          output_url?: string | null
          prompt?: string | null
          request_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits_used?: number
          error_message?: string | null
          generation_type?: string
          id?: string
          model_name?: string
          output_url?: string | null
          prompt?: string | null
          request_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generation_history_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "creative_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generation_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      model_catalog: {
        Row: {
          created_at: string
          cta_href: string | null
          cta_label: string | null
          description: string | null
          id: string
          is_active: boolean
          is_premium: boolean
          model_type: string
          name: string
          safety_level: string
          slug: string
          sort_order: number
          thumbnail_gradient: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_premium?: boolean
          model_type: string
          name: string
          safety_level?: string
          slug: string
          sort_order?: number
          thumbnail_gradient?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_premium?: boolean
          model_type?: string
          name?: string
          safety_level?: string
          slug?: string
          sort_order?: number
          thumbnail_gradient?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      model_pricing: {
        Row: {
          created_at: string
          credit_cost: number
          id: string
          model_id: string
          quality_tier: string
          unit_label: string | null
        }
        Insert: {
          created_at?: string
          credit_cost: number
          id?: string
          model_id: string
          quality_tier: string
          unit_label?: string | null
        }
        Update: {
          created_at?: string
          credit_cost?: number
          id?: string
          model_id?: string
          quality_tier?: string
          unit_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_pricing_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "model_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_paid: number
          created_at: string
          credits_added: number
          id: string
          product_name: string
          product_type: string
          status: string
          stripe_customer_id: string | null
          stripe_payment_id: string | null
          user_id: string
        }
        Insert: {
          amount_paid?: number
          created_at?: string
          credits_added?: number
          id?: string
          product_name: string
          product_type: string
          status?: string
          stripe_customer_id?: string | null
          stripe_payment_id?: string | null
          user_id: string
        }
        Update: {
          amount_paid?: number
          created_at?: string
          credits_added?: number
          id?: string
          product_name?: string
          product_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_payment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          body: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
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
          caption: string | null
          challenge_id: string | null
          created_at: string
          id: string
          is_public: boolean
          media_gradient: string | null
          media_url: string | null
          model_name: string | null
          updated_at: string
          user_id: string
          views: number
        }
        Insert: {
          caption?: string | null
          challenge_id?: string | null
          created_at?: string
          id?: string
          is_public?: boolean
          media_gradient?: string | null
          media_url?: string | null
          model_name?: string | null
          updated_at?: string
          user_id: string
          views?: number
        }
        Update: {
          caption?: string | null
          challenge_id?: string | null
          created_at?: string
          id?: string
          is_public?: boolean
          media_gradient?: string | null
          media_url?: string | null
          model_name?: string | null
          updated_at?: string
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          plan_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          plan_name?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          plan_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      reward_claims: {
        Row: {
          claimed_at: string
          credits_awarded: number
          id: string
          reward_id: string
          user_id: string
        }
        Insert: {
          claimed_at?: string
          credits_awarded?: number
          id?: string
          reward_id: string
          user_id: string
        }
        Update: {
          claimed_at?: string
          credits_awarded?: number
          id?: string
          reward_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_claims_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "daily_rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      uploaded_files: {
        Row: {
          created_at: string
          file_name: string | null
          file_type: string | null
          file_url: string
          id: string
          request_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          file_type?: string | null
          file_url: string
          id?: string
          request_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          file_name?: string | null
          file_type?: string | null
          file_url?: string
          id?: string
          request_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uploaded_files_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "creative_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "uploaded_files_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_daily_reward: {
        Args: { p_reward_id: string }
        Returns: {
          claimed_at: string
          credits_awarded: number
          id: string
          reward_id: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "reward_claims"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
