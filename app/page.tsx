const data = Array.from({ length: 365 }, () => ({
  count: Math.floor(Math.random() * 10),
}));

const average = data.reduce((sum, day) => sum + day.count, 0) / data.length;

export default function Home() {
  return (
      <main className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold mb-8">
          Git Activity
        </h1>

        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {data.map((day, index) => {
              const opacity = Math.min(
                  Math.max(day.count / average, 0.15), 1
              );

            return (
                <div
                    key={index}
                    className="w-4 h-4 rounded-sm bg-pink-500"
                    style={{
                      opacity: opacity,
                    }}
                />
            );
          })}
        </div>
      </main>
  );
}