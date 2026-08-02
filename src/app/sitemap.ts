
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE = 'https://aartiq.ponsrischool.in';
const LAST_MODIFIED = new Date('2026-08-02');

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: SITE, lastModified: LAST_MODIFIED, changeFrequency: 'daily', priority: 1 },
        { url: `${SITE}/features`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/downloads`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/getting-started`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/overview`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/components`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/changelog`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE}/docs/ai-commands`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/automation`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE}/docs/security`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE}/docs/cloud-sync`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE}/docs/deep-links`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/plugins`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE}/docs/extensions`, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE}/docs/native-api`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/apple-integration`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/windows-integration`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/linux-integration`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/keyboard-shortcuts`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${SITE}/docs/api-reference`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE}/docs/troubleshooting`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/docs/testing`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${SITE}/docs/contributing`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${SITE}/mcp-settings`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${SITE}/privacy`, lastModified: LAST_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    ];
}
