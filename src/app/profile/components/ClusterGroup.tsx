// src/app/profile/components/ClusterGroup.tsx

import TILCard from "@/app/til/TILCard";
import type { TIL } from "@/lib/types";

type Props = {
  cluster: {
    title: string;
    tils: TIL[];
  };
  isPremium: boolean;
  isBasic: boolean;
};

export default function ClusterGroup({ cluster }: Props) {
  return (
    <section className="space-y-3 mt-6">
      <h3 className="text-sm text-gray-600 font-semibold border-b border-gray-100 pb-1">
        🧠 {cluster.title}
      </h3>

      {cluster.tils.map((til) => (
        <TILCard
          key={til.id}
          til={{
            ...til,
            user:
              typeof til.user === "string"
                ? { username: til.user }
                : til.user ?? { username: "unknown" },
          }}
        />
      ))}
    </section>
  );
}
