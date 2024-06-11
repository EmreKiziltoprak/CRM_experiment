import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
};

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

export default withNextIntl(nextConfig);
