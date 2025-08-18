import React, { useState } from 'react';
import { Button3D } from '@/components/ui/Button3D';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Palette, Wand2, Eye, Share, Download, Heart } from 'lucide-react';
import { toast } from 'sonner';

const artStyles = [
  'Cyberpunk', 'Synthwave', 'Digital Abstract', 'Neon Futuristic', 
  'Glitch Art', 'Vaporwave', 'Sci-Fi Landscape', 'Digital Portrait'
];

const aiModels = [
  { name: 'FX1 Dreamer v2', description: 'Best for abstract and surreal art' },
  { name: 'Cyber Vision Pro', description: 'Perfect for cyberpunk and futuristic themes' },
  { name: 'Neon Genesis', description: 'Specialized in vibrant, neon-lit creations' }
];

export default function CreateArt() {
  const [activeTab, setActiveTab] = useState<'upload' | 'generate'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [artTitle, setArtTitle] = useState('');
  const [artDescription, setArtDescription] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArt, setGeneratedArt] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const generateAIArt = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Please enter a prompt for AI generation');
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedArt('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=512&h=512&fit=crop');
      setIsGenerating(false);
      toast.success('AI artwork generated successfully!');
    }, 3000);
  };

  const saveArtwork = () => {
    if (!artTitle.trim()) {
      toast.error('Please enter a title for your artwork');
      return;
    }
    
    // This would require Supabase integration
    toast.success('Artwork saved to your collection!');
  };

  const mintNFT = () => {
    if (!artTitle.trim() || (!uploadedFile && !generatedArt)) {
      toast.error('Please complete your artwork before minting');
      return;
    }

    // This would require blockchain integration via Supabase
    toast.success('NFT minting process started!');
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Create Digital Art
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your masterpiece or generate stunning AI art, then mint it as an NFT
          </p>
        </div>

        {/* Creation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-lg p-1 flex">
            <Button3D
              variant={activeTab === 'upload' ? 'nft' : 'wallet'}
              size="sm"
              onClick={() => setActiveTab('upload')}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Art</span>
            </Button3D>
            <Button3D
              variant={activeTab === 'generate' ? 'nft' : 'wallet'}
              size="sm"
              onClick={() => setActiveTab('generate')}
              className="flex items-center space-x-2"
            >
              <Wand2 className="w-4 h-4" />
              <span>Generate AI Art</span>
            </Button3D>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Creation Panel */}
          <Card className="bg-gradient-card border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {activeTab === 'upload' ? (
                  <>
                    <Upload className="w-5 h-5 text-primary" />
                    <span>Upload Your Artwork</span>
                  </>
                ) : (
                  <>
                    <Palette className="w-5 h-5 text-primary" />
                    <span>AI Art Generation</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeTab === 'upload' ? (
                <div>
                  <div className="border-2 border-dashed border-border/50 hover:border-primary/50 rounded-lg p-8 text-center transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center space-y-4"
                    >
                      <Upload className="w-12 h-12 text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">Click to upload your artwork</p>
                        <p className="text-sm text-muted-foreground">
                          Supports JPG, PNG, GIF up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                  {uploadedFile && (
                    <p className="text-sm text-green-500 text-center">
                      ✓ {uploadedFile.name} uploaded successfully
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">AI Prompt</label>
                    <Textarea
                      placeholder="Describe the artwork you want to create... (e.g., 'A futuristic cityscape with neon lights and flying cars')"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="bg-secondary/30 border-border/50 focus:border-primary/50"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Art Style</label>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger className="bg-secondary/30 border-border/50">
                        <SelectValue placeholder="Choose an art style" />
                      </SelectTrigger>
                      <SelectContent>
                        {artStyles.map((style) => (
                          <SelectItem key={style} value={style.toLowerCase()}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">AI Model</label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="bg-secondary/30 border-border/50">
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        {aiModels.map((model) => (
                          <SelectItem key={model.name} value={model.name.toLowerCase()}>
                            <div>
                              <div className="font-medium">{model.name}</div>
                              <div className="text-xs text-muted-foreground">{model.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button3D
                    variant="creator"
                    onClick={generateAIArt}
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate AI Art
                      </>
                    )}
                  </Button3D>
                </div>
              )}

              {/* Artwork Details */}
              <div className="space-y-4 pt-6 border-t border-border/30">
                <h3 className="text-lg font-semibold">Artwork Details</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    placeholder="Enter artwork title"
                    value={artTitle}
                    onChange={(e) => setArtTitle(e.target.value)}
                    className="bg-secondary/30 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Describe your artwork..."
                    value={artDescription}
                    onChange={(e) => setArtDescription(e.target.value)}
                    className="bg-secondary/30 border-border/50 focus:border-primary/50"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="bg-gradient-card border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-primary" />
                <span>Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Artwork Preview */}
                <div className="aspect-square bg-secondary/30 rounded-lg overflow-hidden border border-border/50">
                  {(previewUrl || generatedArt) ? (
                    <img
                      src={previewUrl || generatedArt}
                      alt="Artwork preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Your artwork will appear here</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview Details */}
                {artTitle && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">{artTitle}</h3>
                    {artDescription && (
                      <p className="text-muted-foreground">{artDescription}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Creator: You</span>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button3D
                    variant="wallet"
                    onClick={saveArtwork}
                    className="w-full"
                    disabled={!artTitle || (!uploadedFile && !generatedArt)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Save to Collection
                  </Button3D>
                  
                  <Button3D
                    variant="hero"
                    onClick={mintNFT}
                    className="w-full"
                    disabled={!artTitle || (!uploadedFile && !generatedArt)}
                  >
                    Mint as NFT
                  </Button3D>
                  
                  <Button3D
                    variant="social"
                    className="w-full"
                    disabled={!artTitle || (!uploadedFile && !generatedArt)}
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share Creation
                  </Button3D>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}