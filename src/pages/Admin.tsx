import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAllArticles, Article } from '@/hooks/useArticles';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Pencil, Trash2, LogOut, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const emptyArticle = {
  slug: '',
  title_sk: '',
  title_en: '',
  excerpt_sk: '',
  excerpt_en: '',
  content_sk: '',
  content_en: '',
  category_sk: '',
  category_en: '',
  read_time_sk: '',
  read_time_en: '',
  image: '📝',
  published: false,
};

const Admin = () => {
  const { user, isAdmin, loading, signIn, signOut } = useAuth();
  const { data: articles, isLoading: articlesLoading } = useAllArticles();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [editing, setEditing] = useState<Partial<Article> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    }
    setLoginLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    const articleData = {
      slug: editing.slug!,
      title_sk: editing.title_sk!,
      title_en: editing.title_en!,
      excerpt_sk: editing.excerpt_sk || '',
      excerpt_en: editing.excerpt_en || '',
      content_sk: editing.content_sk || '',
      content_en: editing.content_en || '',
      category_sk: editing.category_sk || '',
      category_en: editing.category_en || '',
      read_time_sk: editing.read_time_sk || '',
      read_time_en: editing.read_time_en || '',
      image: editing.image || '📝',
      published: editing.published || false,
    };

    let error;
    if (editing.id) {
      ({ error } = await supabase.from('articles').update(articleData).eq('id', editing.id));
    } else {
      ({ error } = await supabase.from('articles').insert(articleData));
    }

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Saved!', description: 'Article saved successfully.' });
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Article deleted.' });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  };

  const togglePublished = async (article: Article) => {
    const { error } = await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-heading">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <Button type="submit" disabled={loginLoading} className="w-full bg-brand-teal hover:bg-brand-teal-dark">
                {loginLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <Button variant="ghost" onClick={() => navigate('/')} className="w-full mt-4">
              <ArrowLeft className="mr-2" size={16} />
              {language === 'sk' ? 'Späť na stránku' : 'Back to site'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-heading font-bold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">You don't have admin permissions.</p>
            <div className="space-y-2">
              <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                <ArrowLeft className="mr-2" size={16} /> Back to site
              </Button>
              <Button variant="ghost" onClick={signOut} className="w-full">
                <LogOut className="mr-2" size={16} /> Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-heading font-bold">{editing.id ? 'Edit Article' : 'New Article'}</h1>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                  <Input value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="e.g. my-article" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emoji Icon</label>
                  <Input value={editing.image || ''} onChange={e => setEditing({ ...editing, image: e.target.value })} placeholder="📝" />
                </div>
              </div>

              <h3 className="font-heading font-semibold text-lg border-b pb-2">🇸🇰 Slovak Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title (SK)</label>
                  <Input value={editing.title_sk || ''} onChange={e => setEditing({ ...editing, title_sk: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category (SK)</label>
                    <Input value={editing.category_sk || ''} onChange={e => setEditing({ ...editing, category_sk: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Read Time (SK)</label>
                    <Input value={editing.read_time_sk || ''} onChange={e => setEditing({ ...editing, read_time_sk: e.target.value })} placeholder="5 min čítania" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Excerpt (SK)</label>
                  <Textarea value={editing.excerpt_sk || ''} onChange={e => setEditing({ ...editing, excerpt_sk: e.target.value })} rows={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content HTML (SK)</label>
                  <Textarea value={editing.content_sk || ''} onChange={e => setEditing({ ...editing, content_sk: e.target.value })} rows={6} />
                </div>
              </div>

              <h3 className="font-heading font-semibold text-lg border-b pb-2">🇬🇧 English Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title (EN)</label>
                  <Input value={editing.title_en || ''} onChange={e => setEditing({ ...editing, title_en: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category (EN)</label>
                    <Input value={editing.category_en || ''} onChange={e => setEditing({ ...editing, category_en: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Read Time (EN)</label>
                    <Input value={editing.read_time_en || ''} onChange={e => setEditing({ ...editing, read_time_en: e.target.value })} placeholder="5 min read" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Excerpt (EN)</label>
                  <Textarea value={editing.excerpt_en || ''} onChange={e => setEditing({ ...editing, excerpt_en: e.target.value })} rows={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content HTML (EN)</label>
                  <Textarea value={editing.content_en || ''} onChange={e => setEditing({ ...editing, content_en: e.target.value })} rows={6} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editing.published || false}
                    onChange={e => setEditing({ ...editing, published: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Published</span>
                </label>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSave} disabled={saving} className="bg-brand-teal hover:bg-brand-teal-dark">
                  {saving ? 'Saving...' : 'Save Article'}
                </Button>
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2" size={16} /> Back
            </Button>
            <h1 className="text-2xl font-heading font-bold">Blog Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setEditing({ ...emptyArticle })} className="bg-brand-teal hover:bg-brand-teal-dark">
              <Plus className="mr-2" size={16} /> New Article
            </Button>
            <Button variant="ghost" onClick={signOut}>
              <LogOut size={16} />
            </Button>
          </div>
        </div>

        {articlesLoading ? (
          <p>Loading articles...</p>
        ) : (
          <div className="space-y-4">
            {articles?.map(article => (
              <Card key={article.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{article.image}</span>
                    <div>
                      <h3 className="font-heading font-semibold">{language === 'sk' ? article.title_sk : article.title_en}</h3>
                      <p className="text-sm text-gray-500">/{article.slug} • {article.published ? '✅ Published' : '📝 Draft'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => togglePublished(article)} title={article.published ? 'Unpublish' : 'Publish'}>
                      {article.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditing(article)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(article.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {articles?.length === 0 && <p className="text-center text-gray-500 py-8">No articles yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
