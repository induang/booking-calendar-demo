import { EditableCalendar } from "@/components/course-calendar";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h3>Own DB</h3>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <EditableCalendar />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
