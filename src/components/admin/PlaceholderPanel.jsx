export default function PlaceholderPanel({ title }) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-sm text-gray-400">
        This section is ready for the next CMS editor implementation. The current data layer is already connected to the portfolio context.
      </p>
    </div>
  );
}