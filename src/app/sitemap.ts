import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://greptools.dev';
  const tools = [
    '/tools/json-formatter',
    '/tools/base64-encoder',
    '/tools/url-encoder',
    '/tools/uuid-generator',
    '/tools/unix-timestamp-converter',
  ];

  const routes = ['', '/tools', ...tools].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
