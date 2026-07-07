
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE = 'https://aartiq.vercel.app';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: SITE, lastModified: now, changeFrequency: 'daily', priority: 1 },
        { url: `${SITE}/features`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/downloads`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/getting-started`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/overview`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/components`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE}/docs/changelog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE}/docs/ai-commands`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/automation`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/security`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE}/docs/cloud-sync`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE}/docs/deep-links`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/plugins`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE}/docs/extensions`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE}/docs/native-api`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/apple-integration`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/windows-integration`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/linux-integration`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/keyboard-shortcuts`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/api-reference`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE}/docs/troubleshooting`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/contributing`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${SITE}/docs/mcp-settings`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    ];
}
