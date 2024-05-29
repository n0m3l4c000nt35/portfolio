type Blog = {
  id: number;
  title: string;
};

const blogs: Blog[] = [
  {
    id: 1,
    title: "Hacking",
  },
];

export default function Blog() {
  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="page-title">Blog</h1>
      <ul className="max-w-lg mx-auto">
        {blogs.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </section>
  );
}
