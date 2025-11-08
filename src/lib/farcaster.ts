// Farcaster integration for FX1 Nebula Gallery
// Using Warpcast API and Frame actions

// Farcaster User Interface
export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl?: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
  verifications?: string[];
}

// Check if running in Farcaster context
export function isFarcasterContext(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.search.includes('farcaster') || 
         window.location.href.includes('warpcast.com') ||
         document.referrer.includes('warpcast.com');
}

// Get Farcaster User Profile from Warpcast API
export async function getFarcasterUser(fid: number): Promise<FarcasterUser | null> {
  try {
    const response = await fetch(`https://api.warpcast.com/v2/user?fid=${fid}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    
    const data = await response.json();
    const user = data.result?.user;
    
    if (!user) return null;
    
    return {
      fid: user.fid,
      username: user.username,
      displayName: user.displayName || user.username,
      pfpUrl: user.pfp?.url,
      bio: user.profile?.bio?.text,
      followerCount: user.followerCount || 0,
      followingCount: user.followingCount || 0,
      verifications: user.verifications || []
    };
  } catch (error) {
    console.error('Error fetching Farcaster user:', error);
    return null;
  }
}

// Share to Farcaster (opens Warpcast composer)
export function shareToFarcaster(text: string, embedUrl?: string) {
  const baseUrl = 'https://warpcast.com/~/compose';
  const params = new URLSearchParams({ text });
  if (embedUrl) {
    params.append('embeds[]', embedUrl);
  }
  
  window.open(`${baseUrl}?${params.toString()}`, '_blank');
}

// Open Farcaster profile
export function openFarcasterProfile(username: string) {
  window.open(`https://warpcast.com/${username}`, '_blank');
}

// Get FX1 Farcaster Profile
export async function getFX1FarcasterProfile() {
  return getFarcasterUser(12345); // Replace with actual FX1 FID
}

// Generate Farcaster Frame metadata for HTML
export function generateFrameMetadata(options: {
  title: string;
  image: string;
  url: string;
  buttonText?: string;
}) {
  return {
    'fc:frame': 'vNext',
    'fc:frame:image': options.image,
    'fc:frame:button:1': options.buttonText || 'View',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': options.url,
    'og:title': options.title,
    'og:image': options.image
  };
}