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
      admin_followup_recommendations: {
        Row: {
          admin_notes: string | null
          created_at: string
          follow_up_status: string
          id: string
          recommended_duration: string | null
          recommended_program: string | null
          sales_priority: string | null
          updated_at: string
          user_id: string
          week_1_focus: string | null
          week_2_focus: string | null
          week_3_focus: string | null
          week_4_focus: string | null
          week_5_focus: string | null
          week_6_focus: string | null
          week_7_focus: string | null
          week_8_focus: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          follow_up_status?: string
          id?: string
          recommended_duration?: string | null
          recommended_program?: string | null
          sales_priority?: string | null
          updated_at?: string
          user_id: string
          week_1_focus?: string | null
          week_2_focus?: string | null
          week_3_focus?: string | null
          week_4_focus?: string | null
          week_5_focus?: string | null
          week_6_focus?: string | null
          week_7_focus?: string | null
          week_8_focus?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          follow_up_status?: string
          id?: string
          recommended_duration?: string | null
          recommended_program?: string | null
          sales_priority?: string | null
          updated_at?: string
          user_id?: string
          week_1_focus?: string | null
          week_2_focus?: string | null
          week_3_focus?: string | null
          week_4_focus?: string | null
          week_5_focus?: string | null
          week_6_focus?: string | null
          week_7_focus?: string | null
          week_8_focus?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_followup_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "diagnostic_users"
            referencedColumns: ["id"]
          },
        ]
      }
      article_comments: {
        Row: {
          approved_at: string | null
          article_slug: string
          author_email: string
          author_name: string
          body: string
          created_at: string
          id: string
          ip_hash: string | null
          status: string
          user_agent: string | null
        }
        Insert: {
          approved_at?: string | null
          article_slug: string
          author_email: string
          author_name: string
          body: string
          created_at?: string
          id?: string
          ip_hash?: string | null
          status?: string
          user_agent?: string | null
        }
        Update: {
          approved_at?: string | null
          article_slug?: string
          author_email?: string
          author_name?: string
          body?: string
          created_at?: string
          id?: string
          ip_hash?: string | null
          status?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      blocked_slots: {
        Row: {
          created_at: string
          id: string
          reason: string | null
          slot_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          reason?: string | null
          slot_at: string
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string | null
          slot_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          billing_address: string | null
          billing_id_number: string | null
          billing_name: string | null
          cancelled_at: string | null
          confirmed_at: string | null
          country: string | null
          created_at: string
          email: string
          id: string
          internal_notes: string | null
          name: string
          notes: string | null
          package_kind: string
          package_name: string
          package_slug: string
          phone: string | null
          price_usd: number | null
          slot_at: string
          status: string
        }
        Insert: {
          billing_address?: string | null
          billing_id_number?: string | null
          billing_name?: string | null
          cancelled_at?: string | null
          confirmed_at?: string | null
          country?: string | null
          created_at?: string
          email: string
          id?: string
          internal_notes?: string | null
          name: string
          notes?: string | null
          package_kind: string
          package_name: string
          package_slug: string
          phone?: string | null
          price_usd?: number | null
          slot_at: string
          status?: string
        }
        Update: {
          billing_address?: string | null
          billing_id_number?: string | null
          billing_name?: string | null
          cancelled_at?: string | null
          confirmed_at?: string | null
          country?: string | null
          created_at?: string
          email?: string
          id?: string
          internal_notes?: string | null
          name?: string
          notes?: string | null
          package_kind?: string
          package_name?: string
          package_slug?: string
          phone?: string | null
          price_usd?: number | null
          slot_at?: string
          status?: string
        }
        Relationships: []
      }
      diagnostic_responses: {
        Row: {
          behaviors: Json
          created_at: string
          emotions: Json
          id: string
          impact: Json
          likert: Json
          triggers: Json
          user_id: string
        }
        Insert: {
          behaviors: Json
          created_at?: string
          emotions: Json
          id?: string
          impact: Json
          likert: Json
          triggers: Json
          user_id: string
        }
        Update: {
          behaviors?: Json
          created_at?: string
          emotions?: Json
          id?: string
          impact?: Json
          likert?: Json
          triggers?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "diagnostic_users"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnostic_results: {
        Row: {
          admin_notes: string | null
          as_percent: number
          as_raw: number
          bridge_action: string | null
          created_at: string
          dominant_emotion: string | null
          dominant_pattern: string
          dominant_response_behavior: string | null
          dominant_trigger: string | null
          friction_level: string
          iae_score: number
          icr_score: number
          id: string
          ife_gs_score: number
          ip_percent: number
          ip_raw: number
          mixed_profile_name: string | null
          mixed_profile_type: string
          p_percent: number
          p_raw: number
          pattern_difference: number
          pe_percent: number
          pe_raw: number
          pi_percent: number
          pi_raw: number
          pp_score: number
          recommended_duration: string
          recommended_pathway: string | null
          recommended_program: string
          report_text: string | null
          secondary_pattern: string
          top_productivity_impact_1: string | null
          top_productivity_impact_2: string | null
          top_productivity_impact_3: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          as_percent: number
          as_raw: number
          bridge_action?: string | null
          created_at?: string
          dominant_emotion?: string | null
          dominant_pattern: string
          dominant_response_behavior?: string | null
          dominant_trigger?: string | null
          friction_level: string
          iae_score: number
          icr_score: number
          id?: string
          ife_gs_score: number
          ip_percent: number
          ip_raw: number
          mixed_profile_name?: string | null
          mixed_profile_type: string
          p_percent: number
          p_raw: number
          pattern_difference: number
          pe_percent: number
          pe_raw: number
          pi_percent: number
          pi_raw: number
          pp_score: number
          recommended_duration: string
          recommended_pathway?: string | null
          recommended_program: string
          report_text?: string | null
          secondary_pattern: string
          top_productivity_impact_1?: string | null
          top_productivity_impact_2?: string | null
          top_productivity_impact_3?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          as_percent?: number
          as_raw?: number
          bridge_action?: string | null
          created_at?: string
          dominant_emotion?: string | null
          dominant_pattern?: string
          dominant_response_behavior?: string | null
          dominant_trigger?: string | null
          friction_level?: string
          iae_score?: number
          icr_score?: number
          id?: string
          ife_gs_score?: number
          ip_percent?: number
          ip_raw?: number
          mixed_profile_name?: string | null
          mixed_profile_type?: string
          p_percent?: number
          p_raw?: number
          pattern_difference?: number
          pe_percent?: number
          pe_raw?: number
          pi_percent?: number
          pi_raw?: number
          pp_score?: number
          recommended_duration?: string
          recommended_pathway?: string | null
          recommended_program?: string
          report_text?: string | null
          secondary_pattern?: string
          top_productivity_impact_1?: string | null
          top_productivity_impact_2?: string | null
          top_productivity_impact_3?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "diagnostic_users"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnostic_users: {
        Row: {
          anonymous_research_accepted: boolean
          anonymous_research_accepted_at: string | null
          city: string | null
          company: string | null
          company_size: string | null
          country: string | null
          created_at: string
          department: string | null
          email: string
          full_name: string
          id: string
          ip_hash: string | null
          main_reason: string | null
          phone: string | null
          privacy_accepted: boolean
          privacy_accepted_at: string | null
          responsibility_level: string | null
          role: string | null
          sector: string | null
          user_agent: string | null
          years_experience: string | null
        }
        Insert: {
          anonymous_research_accepted?: boolean
          anonymous_research_accepted_at?: string | null
          city?: string | null
          company?: string | null
          company_size?: string | null
          country?: string | null
          created_at?: string
          department?: string | null
          email: string
          full_name: string
          id?: string
          ip_hash?: string | null
          main_reason?: string | null
          phone?: string | null
          privacy_accepted?: boolean
          privacy_accepted_at?: string | null
          responsibility_level?: string | null
          role?: string | null
          sector?: string | null
          user_agent?: string | null
          years_experience?: string | null
        }
        Update: {
          anonymous_research_accepted?: boolean
          anonymous_research_accepted_at?: string | null
          city?: string | null
          company?: string | null
          company_size?: string | null
          country?: string | null
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          ip_hash?: string | null
          main_reason?: string | null
          phone?: string | null
          privacy_accepted?: boolean
          privacy_accepted_at?: string | null
          responsibility_level?: string | null
          role?: string | null
          sector?: string | null
          user_agent?: string | null
          years_experience?: string | null
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      gstruct_waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          locale: string | null
          metadata: Json | null
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          locale?: string | null
          metadata?: Json | null
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          locale?: string | null
          metadata?: Json | null
          source?: string | null
        }
        Relationships: []
      }
      support_payments: {
        Row: {
          amount_usd: number
          captured_at: string
          created_at: string
          id: string
          payment_status: string
          paypal_capture_id: string | null
          paypal_order_id: string
          paypal_payer_email: string | null
          support_tier: string
          supporter_email: string
          supporter_message: string | null
          supporter_name: string | null
          wants_public_recognition: boolean
        }
        Insert: {
          amount_usd: number
          captured_at?: string
          created_at?: string
          id?: string
          payment_status?: string
          paypal_capture_id?: string | null
          paypal_order_id: string
          paypal_payer_email?: string | null
          support_tier: string
          supporter_email: string
          supporter_message?: string | null
          supporter_name?: string | null
          wants_public_recognition?: boolean
        }
        Update: {
          amount_usd?: number
          captured_at?: string
          created_at?: string
          id?: string
          payment_status?: string
          paypal_capture_id?: string | null
          paypal_order_id?: string
          paypal_payer_email?: string | null
          support_tier?: string
          supporter_email?: string
          supporter_message?: string | null
          supporter_name?: string | null
          wants_public_recognition?: boolean
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
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
          role: Database["public"]["Enums"]["app_role"]
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
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          pattern: string | null
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          pattern?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          pattern?: string | null
          source?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin"
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
      app_role: ["admin"],
    },
  },
} as const
