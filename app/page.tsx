// app/page.tsx - WWC Copywriter Pro - Nicole Helgason Edition
import { useState } from 'react';

const templates = [
  { name: "Reels / Shorts Caption", color: "bg-purple-600" },
  { name: "Instagram Still Caption", color: "bg-pink-600" },
  { name: "YouTube Title + Description", color: "bg-red-600" },
  { name: "Shopify Product Description", color: "bg-green-600" },
  { name: "New Arrival Email Blast", color: "bg-blue-600" },
  { name: "Abandoned Cart Sequence", color: "bg-orange-600" },
  { name: "SMS Flash Sale (160 chars)", color: "bg-teal-600" },
  { name: "Nationwide Install Page", color: "bg-indigo-600" },
  { name: "Maintenance Service Page", color: "bg-yellow-600" },
  { name: "Restock Alert Email", color: "bg-rose-600" },
  { name: "VIP Collector Teaser", color: "bg-emerald-600" },
  { name: "Instagram Story Caption", color: "bg-cyan-600" },
];

const WWC_PROMPT = `You are WWC Copywriter Pro — elite marketing writer for World Wide Corals. Tone: luxury collector-grade reefing, subtle FOMO, rarity emphasis. Never use: stunning, insane, mind-blowing, unreal. Allowed words: heirloom, museum-grade, legacy, trophy, investment-grade, one-of-one, holy grail. Always mention size/lineage when possible. Max 1–3 coral emojis only (🪸🔥🌊).`;

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput('');

    const fullPrompt = `${WWC_PROMPT}\nTemplate: ${selected}\nDetails: ${input}`;

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        body: JSON.stringify({ prompt: fullPrompt }),
      });
      const data = await res.json();
      setOutput(data.text || 'Error – check console');
    } catch (e) {
      setOutput('Network error – try again');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">WWC Copywriter Pro</h1>
        <p className="text-center text-gray-400 mb-8">Nicole Helgason Edition – Private Tool</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {templates.map((t) => (
            <button
              key={t.name}
              onClick={() => { setSelected(t.name); setOutput(''); }}
              className={`${t.color} p-4 rounded-lg font-medium hover:scale-105 transition ${selected === t.name ? 'ring-4 ring-white' : ''}`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {selected && (
          <div className="bg-gray-900 p-4 rounded-lg mb-4 border border-gray-700">
            <p className="text-sm text-gray-400">Selected → {selected}</p>
          </div>
        )}

        <textarea
          placeholder="Paste coral name, price, size, lineage, drop time, etc..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg mb-4 h-40 text-white placeholder-gray-500"
        />

        <button
          onClick={generate}
          disabled={loading || !selected}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-lg font-bold text-xl hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50"
        >
          {loading ? 'Generating Magic...' : 'Generate WWC Caption →'}
        </button>

        {output && (
          <div className="mt-8 p-6 bg-gray-900 border border-cyan-500 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Output (ready to copy):</h3>
            <p className="whitespace-pre-wrap text-lg">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}
