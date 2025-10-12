interface ZoraEmbedProps {
  collectionUrl: string;
}

export function ZoraEmbed({ collectionUrl }: ZoraEmbedProps) {
  return (
    <div className="w-full h-[520px] rounded-lg overflow-hidden border border-border">
      <iframe
        src={collectionUrl}
        className="w-full h-full"
        title="Zora Collection"
        allow="payment"
      />
    </div>
  );
}
