"use client";

import { useEffect, useRef, useState } from "react";
import type { MapUser } from "lib/body/data";

function Avatar({ user, size }: { user: MapUser; size: number }) {
  // `avatar` may be either an emoji glyph (legacy) or an absolute URL
  // pointing at a real supplier favicon. Pick the right renderer.
  if (user.avatar.startsWith("http")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatar}
        alt={user.username}
        width={size}
        height={size}
        className="rounded-full"
        style={{ width: size, height: size }}
      />
    );
  }
  return <span style={{ fontSize: size * 0.8 }}>{user.avatar}</span>;
}

function UserCard({ user, onClose }: { user: MapUser; onClose: () => void }) {
  return (
    <div className="absolute right-4 top-20 z-20 w-72 rounded-2xl border border-zinc-700 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-xl">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 rounded-full p-1 text-zinc-400 hover:text-white"
      >
        ✕
      </button>
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-2xl">
          <Avatar user={user} size={36} />
        </div>
        <div>
          <h3 className="font-semibold text-white">{user.username}</h3>
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                user.status === "online"
                  ? "bg-green-400"
                  : user.status === "idle"
                    ? "bg-yellow-400"
                    : "bg-zinc-500"
              }`}
            />
            <span className="text-xs text-zinc-400">
              {user.lastSeen} &middot; {user.distance}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-zinc-300">{user.bio}</p>
      <div className="mt-4 flex gap-2">
        {user.url ? (
          <a
            href={user.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 py-2 text-center text-sm font-semibold transition-opacity hover:opacity-90"
          >
            Visit site ↗
          </a>
        ) : (
          <button className="flex-1 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 py-2 text-sm font-semibold transition-opacity hover:opacity-90">
            Wave 👋
          </button>
        )}
        <button className="flex-1 rounded-lg border border-zinc-600 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white">
          Message
        </button>
      </div>
    </div>
  );
}

function UserListPanel({
  users,
  onSelect,
}: {
  users: MapUser[];
  onSelect: (user: MapUser) => void;
}) {
  const online = users.filter((u) => u.status === "online");
  const idle = users.filter((u) => u.status === "idle");

  return (
    <div className="absolute top-20 left-4 z-20 w-64 rounded-2xl border border-zinc-700 bg-zinc-900/95 shadow-2xl backdrop-blur-xl">
      <div className="border-b border-zinc-800 p-3">
        <h3 className="text-sm font-semibold text-white">
          Nearby &middot;{" "}
          <span className="text-green-400">{online.length} online</span>
        </h3>
      </div>
      <div className="max-h-80 overflow-y-auto p-2">
        {[...online, ...idle].map((user) => (
          <button
            key={user.id}
            onClick={() => onSelect(user)}
            className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-zinc-800"
          >
            <div className="relative">
              <Avatar user={user} size={20} />
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-900 ${
                  user.status === "online" ? "bg-green-400" : "bg-yellow-400"
                }`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user.username}
              </p>
              <p className="truncate text-xs text-zinc-400">
                {user.distance} &middot; {user.lastSeen}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function BodyMap({ users }: { users: MapUser[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedUser, setSelectedUser] = useState<MapUser | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([40.7549, -73.984], 14);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 },
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      users.forEach((user) => {
        const color =
          user.status === "online"
            ? "#4ade80"
            : user.status === "idle"
              ? "#facc15"
              : "#71717a";

        const avatarHtml = user.avatar.startsWith("http")
          ? `<img src="${user.avatar}" alt="" style="width:20px;height:20px;border-radius:50%" />`
          : user.avatar;

        const icon = L.divIcon({
          className: "custom-marker",
          html: `<div style="
            width: 36px; height: 36px;
            background: ${color}22;
            border: 2px solid ${color};
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 16px; cursor: pointer;
            box-shadow: 0 0 12px ${color}44;
          ">${avatarHtml}</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        L.marker([user.lat, user.lng], { icon })
          .addTo(map)
          .on("click", () => setSelectedUser(user));
      });

      mapInstance.current = map;
      setMapReady(true);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [users]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />

      {!mapReady && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-zinc-950">
          <div className="text-center">
            <div className="mb-3 text-4xl">🫧</div>
            <div className="text-sm text-zinc-400">Loading map...</div>
          </div>
        </div>
      )}

      {mapReady && users.length > 0 && (
        <UserListPanel users={users} onSelect={setSelectedUser} />
      )}

      {selectedUser && (
        <UserCard user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {mapReady && users.length === 0 && (
        <div className="absolute top-20 left-4 z-20 max-w-sm rounded-2xl border border-zinc-700 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-xl">
          <h3 className="text-sm font-semibold text-white">No merchants</h3>
          <p className="mt-1 text-xs text-zinc-400">
            Failed to load merchants from the upstream source. Check the
            jcnrs3/best-dropshipping-tools README is reachable.
          </p>
        </div>
      )}

      {mapReady && users.length > 0 && (
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/90 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-sm text-zinc-300">
              <strong className="text-white">
                {users.filter((u) => u.status === "online").length}
              </strong>{" "}
              merchants nearby
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
