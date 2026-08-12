export default function EmptyResourceList() {
  return (
    <div
      className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center"
      role="status"
    >
      <div
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl"
        aria-hidden="true"
      >
        🔎
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">No resources found</h3>

      <p className="mt-1 text-sm text-slate-500">
        Try another title, tag or category.
      </p>
    </div>
  );
}
