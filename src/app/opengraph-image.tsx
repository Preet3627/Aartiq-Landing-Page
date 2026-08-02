import { ImageResponse } from 'next/og';
import { AartiqOgImage, OG_SIZE, OG_CONTENT_TYPE, loadOutfitFonts, loadAartiqLogo } from './og-image';

export const alt = 'Aartiq - Open Source AI-Integrated Browser with Local LLM & OS Automation';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
    const [fonts, logo] = await Promise.all([loadOutfitFonts(), loadAartiqLogo()]);
    return new ImageResponse(<AartiqOgImage logo={logo} />, { ...size, fonts });
}
