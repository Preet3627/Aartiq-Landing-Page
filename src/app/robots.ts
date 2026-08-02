
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // Protect dynamic routes if needed, but allow content
        },
        sitemap: 'https://aartiq.ponsrischool.in/sitemap.xml',
        host: 'https://aartiq.ponsrischool.in',
    };
}
