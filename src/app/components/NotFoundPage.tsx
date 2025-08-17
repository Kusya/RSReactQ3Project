import { Link } from './../../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
    <div className="about-page-layout">
      <h1>{t('title')}</h1>
      <p> </p>
      <p>{t('text')}</p>

      <p>
        <Link href="/">{t('link_text')}</Link>
      </p>
    </div>
  );
}
