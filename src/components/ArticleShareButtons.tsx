import React from 'react';
import { Facebook, Instagram, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface ArticleShareButtonsProps {
  url: string;
  title: string;
}

// Edge function URL that serves OG-tagged HTML to crawlers
// and instantly redirects real users to the article page.
// Use this for ALL social shares so Facebook/WhatsApp/LinkedIn/etc.
// pick up article-specific title, image, and description.
const buildShareUrl = (articleUrl: string): string => {
  try {
    const u = new URL(articleUrl);
    const match = u.pathname.match(/^\/article\/([^/?#]+)/);
    if (!match) return articleUrl;
    const slug = match[1];
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    return `https://${projectId}.supabase.co/functions/v1/og-metadata?slug=${encodeURIComponent(slug)}`;
  } catch {
    return articleUrl;
  }
};

const ArticleShareButtons = ({ url, title }: ArticleShareButtonsProps) => {
  const { language } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const shareUrl = buildShareUrl(url);
  const encodedShareUrl = encodeURIComponent(shareUrl);

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success(
        language === 'sk' ? 'Odkaz skopírovaný!' : 'Link copied!'
      );
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(
        language === 'sk' ? 'Nepodarilo sa skopírovať' : 'Failed to copy'
      );
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-heading font-semibold text-brand-charcoal">
        {language === 'sk' ? 'Zdieľať článok' : 'Share this article'}
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={shareOnFacebook}
          className="gap-2 border-brand-teal/30 text-brand-charcoal hover:bg-brand-teal/10 hover:text-brand-teal"
        >
          <Facebook size={16} />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyLink}
          className="gap-2 border-brand-teal/30 text-brand-charcoal hover:bg-brand-teal/10 hover:text-brand-teal"
        >
          {copied ? <Check size={16} /> : <Instagram size={16} />}
          {language === 'sk' ? 'Kopírovať pre Instagram' : 'Copy for Instagram'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyLink}
          className="gap-2 border-brand-teal/30 text-brand-charcoal hover:bg-brand-teal/10 hover:text-brand-teal"
        >
          {copied ? <Check size={16} /> : <Link2 size={16} />}
          {language === 'sk' ? 'Kopírovať odkaz' : 'Copy link'}
        </Button>
      </div>
    </div>
  );
};

export default ArticleShareButtons;
