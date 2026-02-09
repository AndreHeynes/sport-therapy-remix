import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import GoogleMap from '@/components/GoogleMap';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100).regex(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/).max(20).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(1000)
});

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    
    try {
      const validatedData = contactSchema.parse(formData);
      const subject = encodeURIComponent('Contact Form Submission');
      const body = encodeURIComponent(
        `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone || 'Not provided'}\n\nMessage:\n${validatedData.message}`
      );
      window.location.href = `mailto:info@sportbodyterapia.sk?subject=${subject}&body=${body}`;
      toast({ title: t('contact.success.title'), description: t('contact.success.description') });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message; });
        setErrors(fieldErrors);
        toast({ title: "Validation Error", description: "Please check the form for errors", variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-charcoal mb-6">{t('contact.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-brand-teal text-white">
              <CardTitle className="text-2xl font-heading">{t('contact.form.title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal mb-2">{t('contact.form.name')}</label>
                  <Input id="name" name="name" required value={formData.name} onChange={handleChange} className={errors.name ? 'border-red-500' : ''} maxLength={100} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal mb-2">{t('contact.form.email')}</label>
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className={errors.email ? 'border-red-500' : ''} maxLength={255} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-charcoal mb-2">{t('contact.form.phone')}</label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={errors.phone ? 'border-red-500' : ''} maxLength={20} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-charcoal mb-2">{t('contact.form.message')}</label>
                  <Textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} className={errors.message ? 'border-red-500' : ''} placeholder={t('contact.form.placeholder')} maxLength={1000} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  <p className="text-sm text-gray-500 mt-1">{formData.message.length}/1000</p>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold py-3">
                  {isSubmitting ? 'Sending...' : t('contact.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader className="bg-brand-charcoal text-white">
                <CardTitle className="text-xl font-heading">{t('contact.info.title')}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-brand-teal text-xl">📍</div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal">{t('contact.address')}</h4>
                    <p className="text-gray-600">Šport & Body Terapia<br />Štúrova 1532/92<br />Dubnica nad Váhom<br />Slovakia</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-brand-teal text-xl">📞</div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal">{t('contact.phone')}</h4>
                    <a href="tel:+421949291013" className="text-brand-teal hover:underline block">+421 949 291 013</a>
                    <a href="tel:+421948842420" className="text-brand-teal hover:underline block">+421 948 842 420</a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-brand-teal text-xl">✉️</div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal">{t('contact.email')}</h4>
                    <a href="mailto:info@sportbodyterapia.sk" className="text-brand-teal hover:underline">info@sportbodyterapia.sk</a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-brand-teal text-xl">🕒</div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal">{t('contact.hours')}</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>{t('contact.hours.weekdays')}</p>
                      <p>{t('contact.hours.saturday')}</p>
                      <p>{t('contact.hours.sunday')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-brand-charcoal text-white">
                <CardTitle className="text-xl font-heading">{t('contact.map.title')}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <GoogleMap className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
