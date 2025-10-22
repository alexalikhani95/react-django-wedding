export const Information = () => {
  return (
    <div className="mx-auto max-w-xl p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-forest-900">Charlotte & Alex</h1>
        <p className="mt-2 text-lg text-forest-700">Friday, 14th August 2026</p>
      </div>

      {/* Ceremony */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-primary">The Ceremony</h2>
        <p className="mt-2 text-foreground">St John the Baptist Church</p>
        <p className="text-sm">Church Lane, Burley, Ringwood BH24 4AP</p>
        <p className="mt-3 font-medium text-forest-700">13:00</p>
      </div>

      {/* Reception */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-primary">The Reception</h2>
        <p className="mt-2 text-foreground">Burley Manor</p>
        <p className="text-sm">1 Ringwood Road, Burley, Ringwood BH24 4BS</p>
      </div>
    </div>
  );
};
