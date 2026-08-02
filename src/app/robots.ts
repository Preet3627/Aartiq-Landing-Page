
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/', '/auth', '/oauth2callback', '/test-browser'],
        },
        sitemap: 'https://aartiq.ponsrischool.in/sitemap.xml',
        host: 'https://aartiq.ponsrischool.in',
    };
}
