import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function MenuLayout() {
  const t = useTranslations('HomePage');
  return (
    <nav className="flex justify-end p-1">
      <Link href="/about" className="px-4">
        {t('about')}
      </Link>
    </nav>
  );
}
