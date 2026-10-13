import { DealsBoard } from "@/components/deals/deals-board";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          CRM Deals Board
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Deals
        </h1>
        <p className="mt-1.5 text-sm text-gray-600">
          Search, filter, and sort your deals across every stage.
        </p>
      </header>
      <DealsBoard />
    </main>
  );
}
