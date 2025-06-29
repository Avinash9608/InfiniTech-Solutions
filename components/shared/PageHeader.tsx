interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{description}</p>
      </div>
    </section>
  );
}
