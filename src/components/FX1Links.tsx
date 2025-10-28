import React, { useEffect, useState } from "react";
import { Button3D } from "@/components/ui/Button3D";
import { ExternalLink, Users, Gift, DollarSign } from "lucide-react";
import { sdk } from "@farcaster/miniapp-sdk";
import { checkTokenHolder } from "../utils/tokenHooks";

const fx1Links = [
  {
    name: "Base Profile",
    url: "https://base.app/profile/0x5f188E67C374feF892Cc3BaC4aE0689166C6a620",
    icon: <Users size={20} />,
    description: "Check out FX1 Digital Hubs on Base."
  },
  {
    name: "Token Group on Flaunch",
    url: "https://flaunch.gg/base/group/0x50ec14dc217daae2f7f3fc4c86836e0f3a52dde4",
    icon: <Gift size={20} />,
    description: "Join the $FX1_HUBS / $FDH token community."
  },
  {
    name: "Crowdfunding Campaign",
    url: "https://crowdfund.seedclub.com/c/cmh8f815w1nbkqk0s5r82d5hq",
    icon: <DollarSign size={20} />,
    description: "Support FX1 Digital Hubs and help us grow."
  }
];

export const FX1Links: React.FC = () => {
  const [isHolder, setIsHolder] = useState(false);

  useEffect(() => {
    async function verifyHolder() {
      const user = await sdk.users.getCurrentUser();
      if (user?.address) {
        const holder = await checkTokenHolder(user.address);
        setIsHolder(holder);
      }
    }
    verifyHolder();
  }, []);

  return (
    <section className="py-12 border-t border-border/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Explore FX1 Ecosystem
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {fx1Links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button3D variant="social" className="w-full flex flex-col items-start p-6 justify-between group">
                <div className="flex items-center space-x-3 mb-2">
                  {link.icon}
                  <span className="font-semibold text-lg">{link.name}</span>
                  {/* Token holder badge on Flaunch link */}
                  {link.name === "Token Group on Flaunch" && isHolder && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-semibold">
                      Holder
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{link.description}</p>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
              </Button3D>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};