import Link from "next/link";
import React from "react";

export type SettingsItemProps = {
  label: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
};

export function SettingsItem({
  label,
  onClick,
  rightElement,
  href,
  external = false,
  icon,
}: SettingsItemProps) {
  const content = (
    <div
      className={`flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded ${
        !onClick && !href ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-800">{label}</span>
      </div>
      {rightElement}
    </div>
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link href={href}>{content}</Link>
    );
  }

  return content;
}
