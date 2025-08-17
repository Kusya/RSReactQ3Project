import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function MenuLayout() {
  const t = useTranslations('HomePage');

  return (
    <nav className="flex justify-end px-2">
      <Link href="/about" className="px-2">
        {t('about')}
      </Link>
      <Link href="/" locale="ru" className="px-2">
        Ru
      </Link>
      <Link href="/" locale="en" className="px-2">
        En
      </Link>
    </nav>
  );
}
