import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function About() {
  const t = useTranslations('AboutPage');
  return (
    <div className="about-page-layout">
      <h1>{t('title')}</h1>
      <p> </p>
      <p>{t('author')}</p>
      <p>
        {t('project')}{' '}
        <Link href="https://rs.school/courses/reactjs" className="px-4">
          {t('project_link_text')}
        </Link>
      </p>
      <p> </p>
      <p>{t('project_info')}</p>
      <p>
        <Link href="/">{t('go_back_link')}</Link>
      </p>
    </div>
  );
}
