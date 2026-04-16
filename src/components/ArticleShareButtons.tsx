import React from 'react';
import { Facebook, Instagram, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface ArticleShareButtonsProps {
  url: string;
  title: string;
}

const ArticleShareButtons = ({ url, title }: ArticleShareButtonsProps) => {
  const { language } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const encodedUrl = encodeURIComponent(url);

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
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
