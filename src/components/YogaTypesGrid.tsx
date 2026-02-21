interface YogaType {
  id: number;
  name: string;
}

interface YogaTypesGridProps {
  title: string;
  description?: string;
  types: YogaType[];
}

export default function YogaTypesGrid({
  title,
  description,
  types,
}: YogaTypesGridProps) {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="text-secondary">◉</span> {title}
        </h3>
        {description && (
          <p className="text-muted-foreground font-body leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {types.map((type) => (
          <div
            key={type.id}
            className="group p-4 md:p-5 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 hover:border-secondary/40 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-secondary font-bold">{type.id}</span>
              </div>
            </div>
            <p className="text-center font-heading font-semibold text-foreground text-sm md:text-base">
              {type.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
