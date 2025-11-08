// Zora API Integration for Base Chain NFTs

const ZORA_API_ENDPOINT = 'https://api.zora.co/v1';
const BASE_CHAIN_ID = 8453;

export interface ZoraNFT {
  tokenId: string;
  name: string;
  description: string;
  image: string;
  creator: {
    address: string;
    username?: string;
  };
  collection: {
    address: string;
    name: string;
  };
  price?: {
    amount: string;
    currency: string;
  };
  mintedAt: string;
}

export interface ZoraCollection {
  address: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  totalSupply: number;
  floorPrice?: string;
}

// Fetch user's NFT collections from Zora
export async function fetchUserCollections(address: string): Promise<ZoraCollection[]> {
  try {
    const response = await fetch(
      `${ZORA_API_ENDPOINT}/collections/user/${address}?chain=${BASE_CHAIN_ID}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch collections');
    
    const data = await response.json();
    return data.collections || [];
  } catch (error) {
    console.error('Error fetching Zora collections:', error);
    return [];
  }
}

// Fetch NFTs from a collection
export async function fetchCollectionNFTs(collectionAddress: string, limit = 20): Promise<ZoraNFT[]> {
  try {
    const response = await fetch(
      `${ZORA_API_ENDPOINT}/nfts?collection=${collectionAddress}&chain=${BASE_CHAIN_ID}&limit=${limit}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch NFTs');
    
    const data = await response.json();
    return data.nfts || [];
  } catch (error) {
    console.error('Error fetching collection NFTs:', error);
    return [];
  }
}

// Mint NFT on Zora (returns transaction data)
export async function prepareZoraMint(collectionAddress: string, tokenId?: string) {
  try {
    const endpoint = tokenId 
      ? `${ZORA_API_ENDPOINT}/mint/${collectionAddress}/${tokenId}`
      : `${ZORA_API_ENDPOINT}/mint/${collectionAddress}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chain: BASE_CHAIN_ID })
    });
    
    if (!response.ok) throw new Error('Failed to prepare mint');
    
    const data = await response.json();
    return {
      to: data.to,
      data: data.data,
      value: data.value || '0',
      success: true
    };
  } catch (error) {
    console.error('Error preparing Zora mint:', error);
    return { success: false, error };
  }
}

// Fetch @fx1_hubs creator profile from Zora
export async function fetchFX1CreatorProfile() {
  try {
    const response = await fetch(`${ZORA_API_ENDPOINT}/users/@fx1_hubs`);
    
    if (!response.ok) throw new Error('Failed to fetch creator profile');
    
    const data = await response.json();
    return {
      username: data.username,
      displayName: data.displayName,
      bio: data.bio,
      pfpUrl: data.pfpUrl,
      collections: data.collections || [],
      totalMinted: data.totalMinted || 0,
      earnings: data.earnings || '0'
    };
  } catch (error) {
    console.error('Error fetching FX1 creator profile:', error);
    return null;
  }
}

// Search Zora for fashion/art NFTs
export async function searchZoraNFTs(query: string, limit = 20): Promise<ZoraNFT[]> {
  try {
    const response = await fetch(
      `${ZORA_API_ENDPOINT}/search?q=${encodeURIComponent(query)}&chain=${BASE_CHAIN_ID}&limit=${limit}`
    );
    
    if (!response.ok) throw new Error('Failed to search NFTs');
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching Zora NFTs:', error);
    return [];
  }
}