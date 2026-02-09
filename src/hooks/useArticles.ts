import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Article {
  id: string;
  slug: string;
  title_sk: string;
  title_en: string;
  excerpt_sk: string;
  excerpt_en: string;
  content_sk: string;
  content_en: string;
  category_sk: string;
  category_en: string;
  read_time_sk: string;
  read_time_en: string;
  image: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const usePublishedArticles = () => {
  return useQuery({
    queryKey: ['articles', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Article[];
    },
  });
};

export const useArticleBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['articles', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug!)
        .single();
      if (error) throw error;
      return data as Article;
    },
    enabled: !!slug,
  });
};

export const useAllArticles = () => {
  return useQuery({
    queryKey: ['articles', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Article[];
    },
  });
};
